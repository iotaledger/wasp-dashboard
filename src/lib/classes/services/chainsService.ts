import { WaspClientService, ServiceFactory, LocalStorageService } from "../../classes";
import { BlockInfoResponse, RequestReceiptResponse } from "../../wasp_client";

export interface BlockData {
    info?: BlockInfoResponse;
    requests: RequestReceiptResponse[];
    events?: string[];
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
    private _cachedChains: Record<string, BlockData[]>;

    constructor() {
        this._waspClientService = ServiceFactory.get<WaspClientService>(WaspClientService.ServiceName);
        this._storageService = ServiceFactory.get<LocalStorageService>(LocalStorageService.ServiceName);
        this._cachedChains = this._storageService.load("chains") ?? {};
    }

    /**
     * Method to initialize the service.
     */
    public initialize(): void {
        this._cachedChains = this._storageService.load("chains") ?? {};
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
            const savedBlock = savedChain[blockIndex];
            if (savedBlock.info && savedBlock.events && savedBlock.requests) {
                return savedBlock;
            }
        } else {
            this._cachedChains[chainID] = [];
        }

        const block: BlockData = {
            requests: [],
        };

        // Otherwise feth it and cache it for the next time
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

        this._cachedChains[chainID][blockIndex] = block;
        this.save();

        return block;
    }

    public save() {
        this._storageService.save("chains", this._cachedChains);
    }
}
