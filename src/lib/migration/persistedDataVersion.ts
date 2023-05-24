import { ServiceFactory, LocalStorageService } from "../classes";
import { ChainData } from "../classes/services/chainsService";
import { MAX_CACHED_BLOCKS } from "../constants";
import { LocalStorageKey } from "../enums";

const CURRENT_PERSISTED_DATA_VERSION = 2;
/**
 *
 */
export function checkAndMigrate(): void {
    const storageService = ServiceFactory.get<LocalStorageService>(LocalStorageService.ServiceName);
    const version = storageService.load(LocalStorageKey.PersistedDataVersion) ?? 1; // Get the current version
    const shouldMigratePersistedChains = version < CURRENT_PERSISTED_DATA_VERSION;
    if (shouldMigratePersistedChains) {
        migrateEachVersion();
    }
}
/**
 *
 */
function migrateEachVersion(): void {
    const storageService = ServiceFactory.get<LocalStorageService>(LocalStorageService.ServiceName);
    let version: number = storageService.load(LocalStorageKey.PersistedDataVersion) ?? 1; // Get the current version
    for (CURRENT_PERSISTED_DATA_VERSION; version < CURRENT_PERSISTED_DATA_VERSION; version++) {
        migratePersistedChains(version + 1);
        storageService.save(LocalStorageKey.PersistedDataVersion, version + 1);
    }
}

/**
 *
 * @param migrationVersion
 */
function migratePersistedChains(migrationVersion: number): void {
    const storageService = ServiceFactory.get<LocalStorageService>(LocalStorageService.ServiceName);
    const chains: Record<string, ChainData> = storageService.load(LocalStorageKey.Chains) ?? {};
    switch (migrationVersion) {
        case 2: {
            if (chains && Object.keys(chains).length > 0) {
                const chainID = Object.keys(chains)[0];
                const blocks = [...chains[chainID].blocks].filter(block => block !== undefined && block !== null);
                chains[chainID].blocks =
                    blocks.length > MAX_CACHED_BLOCKS ? blocks.splice(0, MAX_CACHED_BLOCKS) : blocks;
            }
            break;
        }
        default: {
            break;
        }
    }
    storageService.save(LocalStorageKey.Chains, chains);
}
