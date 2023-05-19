import { ServiceFactory, LocalStorageService } from "../classes";
import { BlockData, ChainData } from "../classes/services/chainsService";

const storageService = ServiceFactory.get<LocalStorageService>(LocalStorageService.ServiceName);
const cachedVersion = storageService.load<number>("version");

const CURRENT_CACHE_VERSION = 1;

/**
 *
 */
export function checkAndMigrateCache() {
    if (!cachedVersion) {
        storageService.save("version", 0);
    }

    if (cachedVersion < CURRENT_CACHE_VERSION) {
        migrateCache(cachedVersion);
        storageService.save("version", CURRENT_CACHE_VERSION);
    }
}

/**
 *
 * @param previousVersion
 */
function migrateCache(previousVersion: number | null) {
    if (!previousVersion || previousVersion < 1) {
        migrateFromVersion0();
    }
}

// First migration: from version 0 to version 1
/**
 *
 */
function migrateFromVersion0() {
    const catchedChains = storageService.load<Record<string, ChainData>>("chains");
    if (catchedChains) {
        const chainID = Object.keys(catchedChains)[0];
        const chainData = catchedChains[chainID];
        const blocks = chainData.blocks;
        for (const block of blocks) {
            cacheChainBlock(chainID, block);
        }
        storageService.save("chains", catchedChains);
    }
}

/**
 *
 * @param chainID
 * @param blockIndex
 * @param block
 */
function cacheChainBlock(chainID: string, block: BlockData) {
    const cachedChains: Record<string, ChainData> = storageService.load("chains");
    const cachedChainData = cachedChains[chainID] ?? { blocks: [] };

    // Check if the block already exists
    const existingBlockIndex = cachedChainData.blocks.findIndex(
        cachedBlock => cachedBlock.info?.blockIndex === block.info?.blockIndex,
    );

    // If it exists, remove it
    if (existingBlockIndex !== -1) {
        cachedChainData.blocks.splice(existingBlockIndex, 1);
    }

    // Add the block to the cache
    const blockCachedData: BlockData = { ...block };

    cachedChainData.blocks.push(blockCachedData);

    // Limit the number of blocks in cache
    const maxLength = 100;
    if (cachedChainData.blocks.length > maxLength) {
        // Find the block that is the furthest away from the current block
        let maxDifference = Number.NEGATIVE_INFINITY;
        let indexToRemove = -1;
        for (let i = 0; i < maxLength; i++) {
            const difference = Math.abs(
                (cachedChainData.blocks[i]?.info?.blockIndex ?? 0) - (block.info?.blockIndex ?? 0),
            );
            if (difference > maxDifference) {
                maxDifference = difference;
                indexToRemove = i;
            }
        }
        if (indexToRemove !== -1) {
            cachedChainData.blocks.splice(indexToRemove, 1);
        }
    }
    // Save the updated cached blocks
    cachedChains[chainID] = cachedChainData;
}
