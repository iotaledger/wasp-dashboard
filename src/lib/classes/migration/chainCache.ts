import { ServiceFactory } from "../factories";
import { LocalStorageService } from "../services";
import { BlockData, ChainData } from "../services/chainsService";

const CURRENT_CACHE_VERSION = 1;

/**
 *
 */
export function checkAndMigrateCache() {
    const storageService = ServiceFactory.get<LocalStorageService>(LocalStorageService.ServiceName);
    const cachedVersion = storageService.load<number>("version");
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
    const storageService = ServiceFactory.get<LocalStorageService>(LocalStorageService.ServiceName);
    let catchedChains = storageService.load<Record<string, ChainData>>("chains");
    if (catchedChains) {
        const chainID = Object.keys(catchedChains)[0];
        catchedChains = catchedChains[chainID]?.filter((blockData: BlockData) => "id" in blockData);
        storageService.save("chains", catchedChains);
    }
}
