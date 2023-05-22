import { WaspClientService, ServiceFactory, LocalStorageService } from "../../classes";
import { BlockInfoResponse, BlockInfoResponseFromJSON, RequestReceiptResponse } from "../../wasp_client";
import { checkAndMigrateCache } from "../migration";

// Information about a Block
export interface BlockData {
    info?: BlockInfoResponse;
    requests: RequestReceiptResponse[];
    events?: string[];
}

// Information about a Chain
export interface ChainData {
    blocks: BlockData[] | BlockCachedData[];
}

export interface BlockCachedData {
    id: number;
    block: BlockData;
}

export interface ChainCachedData {
    blocks: BlockCachedData[];
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

    /**
     * Saved version.
     */
    private _cachedVersion: number;

    constructor() {
        this._waspClientService = ServiceFactory.get<WaspClientService>(WaspClientService.ServiceName);
        this._storageService = ServiceFactory.get<LocalStorageService>(LocalStorageService.ServiceName);
        this._cachedChains = this._storageService.load("chains") ?? {};
        this._cachedVersion = this._storageService.load("version") ?? 0;
    }

    /**
     * Method to initialize the service.
     */
    public initialize(): void {
        this._cachedChains = this._storageService.load("chains") ?? {};
        this._cachedVersion = this._storageService.load("version") ?? 0;
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
            const savedBlock = savedChain.blocks[blockIndex] as BlockData;
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

        if (this._cachedVersion < 1 || !this._cachedVersion) {
            checkAndMigrateCache();
        } else {
            this.cacheChainBlock(chainID, block); // Cache the block
        }

        // Save the updated cached blocks
        return block;
    }

    /**
     * Save the cached chains.
     */
    public save(): void {
        this._storageService.save("chains", this._cachedChains);
    }

    private cacheChainBlock(chainID: string, block: BlockData) {
        const cachedChainData = this._cachedChains[chainID] as ChainCachedData;

        cachedChainData.blocks = cachedChainData.blocks.filter(blockData => "id" in blockData);
        // Check if the block already exists
        const existingBlockIndex = cachedChainData?.blocks?.findIndex(
            // eslint-disable-next-line @typescript-eslint/no-shadow
            block => block?.id === block?.block?.info?.blockIndex,
        );

        // If it exists, remove it
        if (existingBlockIndex !== -1) {
            cachedChainData.blocks.splice(existingBlockIndex, 1);
        }

        // Add the block to the cache
        const blockCachedData = {
            id: block.info?.blockIndex,
            block,
        } as BlockCachedData;

        cachedChainData.blocks.push(blockCachedData);

        // Limit the number of blocks in cache
        const maxLength = 100;
        if (cachedChainData.blocks.length > maxLength) {
            // Find the block that is the furthest away from the current block
            let maxDifference = Number.NEGATIVE_INFINITY;
            let indexToRemove = -1;
            for (let i = 0; i < maxLength; i++) {
                if (block?.info?.blockIndex) {
                    const difference = Math.abs(block?.info?.blockIndex - cachedChainData.blocks[i].id);
                    if (difference > maxDifference) {
                        maxDifference = difference;
                        indexToRemove = i;
                    }
                }
                if (indexToRemove !== -1) {
                    cachedChainData.blocks.splice(indexToRemove, 1);
                }
            }
        }
        // Save the updated cached blocks
        this._cachedChains[chainID] = cachedChainData;
        this.save();
    }
}
