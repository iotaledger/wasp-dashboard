import { WaspClientService, ServiceFactory, LocalStorageService } from "../../classes";
import { MAX_CACHED_BLOCKS } from "../../constants";
import { LocalStorageKey } from "../../enums";
import { BlockInfoResponse, BlockInfoResponseFromJSON, RequestReceiptResponse } from "../../wasp_client";
// Information about a Block
export interface BlockData {
    info?: BlockInfoResponse;
    requests: RequestReceiptResponse[];
    events?: string[];
}
// Information about a Chain
export interface ChainData {
    blocks: BlockData[];
}

/**
 * Class to manage chains.
 */
export class ChainsService {
    public static readonly ServiceName = "ChainsService";

    /**
     * The client service.
     */
    private readonly _waspClientService: WaspClientService;

    /**
     * The storage service.
     */
    private readonly _storageService: LocalStorageService;

    /**
     * Saved blocks.
     */
    private _cachedChains: Record<string, ChainData>;

    constructor() {
        this._waspClientService = ServiceFactory.get<WaspClientService>(WaspClientService.ServiceName);
        this._storageService = ServiceFactory.get<LocalStorageService>(LocalStorageService.ServiceName);
        this._cachedChains = this._storageService.load(LocalStorageKey.Chains) ?? {};
    }

    /**
     * Method to initialize the service.
     */
    public initialize(): void {
        this._cachedChains = this._storageService.load(LocalStorageKey.Chains) ?? {};
    }

    /**
     * Get the last block of a chain
     * @param chainID  The Chain ID
     * @returns The block information.
     */
    public async getLatestBlock(chainID: string): Promise<BlockInfoResponse | null> {
        const blockInfo = await this._waspClientService
            .corecontracts()
            .blocklogGetLatestBlockInfo({ chainID })
            .then(newBlockInfo => newBlockInfo)
            .catch(() => null);
        return blockInfo;
    }

    /**
     * Get a block by it's chain and index
     * @param chainID  The Chain ID
     * @param blockIndex  The Block index
     * @returns The block information.
     */
    public async getBlock(chainID: string, blockIndex: number): Promise<BlockData | undefined> {
        // Return the block if it's cached
        const savedChain = this._cachedChains[chainID];
        if (savedChain) {
            const savedBlock = savedChain.blocks.find(block => block.info?.blockIndex === blockIndex);
            if (savedBlock?.info && savedBlock?.events && savedBlock?.requests) {
                return {
                    ...savedBlock,
                    // eslint-disable-next-line new-cap
                    info: BlockInfoResponseFromJSON(savedBlock.info),
                };
            }
        } else {
            this._cachedChains[chainID] = {
                blocks: [],
            };
        }
        const block: BlockData = {
            requests: [],
        };
        // Otherwise fecth it and cache it for the next time
        await Promise.all([
            this._waspClientService
                .corecontracts()
                .blocklogGetBlockInfo({ chainID, blockIndex })
                .then(newBlockInfo => {
                    block.info = newBlockInfo;
                })
                .catch(console.error),
            this._waspClientService
                .corecontracts()
                .blocklogGetEventsOfBlock({ chainID, blockIndex })
                .then(events => {
                    if (events.events) {
                        block.events = events.events;
                    }
                })
                .catch(console.error),
            this._waspClientService
                .corecontracts()
                .blocklogGetRequestReceiptsOfBlock({ chainID, blockIndex })
                .then(async newBlockReceipts => {
                    if (newBlockReceipts.receipts) {
                        block.requests = newBlockReceipts.receipts;
                    }
                })
                .catch(console.error),
        ]);
        this.cacheChainBlock(chainID, block);
        return block;
    }

    /**
     * Persist the cached blocks
     */
    public save() {
        this._storageService.save(LocalStorageKey.Chains, this._cachedChains);
    }

    private cacheChainBlock(chainID: string, block: BlockData) {
        let cachedChainBlocks = this._cachedChains[chainID]?.blocks ?? [];
        const blockAlreadyCached = cachedChainBlocks?.find(
            _block => _block.info?.blockIndex === block.info?.blockIndex,
        );

        if (!blockAlreadyCached) {
            cachedChainBlocks = cachedChainBlocks.filter(Boolean);
            // if the max size is reached, remove as many blocks as needed to add the new one
            if (cachedChainBlocks.length >= MAX_CACHED_BLOCKS) {
                cachedChainBlocks.splice(0, cachedChainBlocks.length - MAX_CACHED_BLOCKS + 1);
            }
            cachedChainBlocks.push(block);
            this._cachedChains[chainID].blocks = cachedChainBlocks;
            this.save();
        }
    }
}
