import { WaspClientService, ServiceFactory, LocalStorageService } from "../../classes";
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

export interface BlockCachedData {
    id: number;
    block: BlockData;
}

export interface ChainCachedData {
    blocks: BlockCachedData[];
}

const CURRENT_VERSION = 1;

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
        this._cachedChains = this._storageService.load("chains") ?? {};
        this.checkVersionAndMigrateCachedChain();
    }

    /**
     * Method to initialize the service.
     */
    public initialize(): void {
        this._cachedChains = this._storageService.load("chains") ?? {};
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
            const savedBlock = savedChain.blocks[blockIndex];
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

        this._cachedChains[chainID].blocks[blockIndex] = block;

        this.cacheChainBlock(chainID, block); // Cache the block

        return block;
    }

    /**
     * Save the cached chains.
     */
    public save(): void {
        this._storageService.save("chains", this._cachedChains);
    }

    private cacheChainBlock(chainID: string, block: BlockData) {
        const cachedChainData = this._cachedChains[chainID] ?? { blocks: [] };

        cachedChainData.blocks?.filter(b => b !== undefined && b !== null);

        // Add the new block only if it exists
        if (cachedChainData.blocks?.find(b => b?.info?.blockIndex === block?.info?.blockIndex)) {
            // Limit the number of blocks in cache
            const maxLength = 100;
            cachedChainData.blocks = cachedChainData.blocks
                .filter(b => b?.info?.blockIndex !== block?.info?.blockIndex)
                .slice(1, maxLength);

            cachedChainData.blocks.push(block);
        }

        // Save the updated cached blocks
        this._cachedChains[chainID] = cachedChainData;
        // Save the updated cached blocks
        this.save();
    }

    private checkVersionAndMigrateCachedChain() {
        const version = this._storageService.load("version"); // Get the current version
        if (!version) {
            // Migrate from no version to version 1
            for (const chainID in this._cachedChains) {
                // eslint-disable-next-line no-prototype-builtins
                if (this._cachedChains?.hasOwnProperty(chainID)) {
                    const oldChainData = this._cachedChains[chainID] as unknown as BlockData[];
                    const newChainData: ChainData = {
                        blocks: oldChainData,
                    };
                    this._cachedChains[chainID] = newChainData;
                }
            }
            // Save the current version
            this._storageService.save("version", CURRENT_VERSION);
            // Save the updated cached chains
            this.save();
        }
    }
}
