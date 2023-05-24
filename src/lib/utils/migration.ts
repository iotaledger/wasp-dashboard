import { ServiceFactory, LocalStorageService } from "../classes";
import { ChainData } from "../classes/services/chainsService";
import { MAX_CACHED_BLOCKS } from "../constants";
import { LocalStorageKey } from "../enums";

let storageService: LocalStorageService;

interface Migration {
    version: number;
    migrateFunction: () => void;
}

const MIGRATIONS: Migration[] = [
    {
        version: 2,
        migrateFunction: migrateToVersion2,
    },
];

const CURRENT_PERSISTED_DATA_VERSION = 2;

/**
 *
 */
function initStorageService(): void {
    storageService = ServiceFactory.get<LocalStorageService>(LocalStorageService.ServiceName);
}

/**
 *
 */
export function checkAndMigrate(): void {
    if (!storageService) {
        initStorageService();
    }
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
    if (!storageService) {
        initStorageService();
    }
    let version: number = storageService.load(LocalStorageKey.PersistedDataVersion) ?? 1; // Get the current version
    for (CURRENT_PERSISTED_DATA_VERSION; version < CURRENT_PERSISTED_DATA_VERSION; version++) {
        MIGRATIONS.find(migration => migration.version === version)?.migrateFunction();
        storageService.save(LocalStorageKey.PersistedDataVersion, version + 1);
    }
}

/**
 *
 */
function migrateToVersion2(): void {
    if (!storageService) {
        initStorageService();
    }
    const chains: Record<string, ChainData> = storageService.load(LocalStorageKey.Chains) ?? {};

    if (chains && Object.keys(chains).length > 0) {
        const chainID = Object.keys(chains)[0];
        const blocks = [...chains[chainID].blocks].filter(block => block !== undefined && block !== null);
        chains[chainID].blocks = blocks.length > MAX_CACHED_BLOCKS ? blocks.splice(0, MAX_CACHED_BLOCKS) : blocks;
    }
    storageService.save(LocalStorageKey.Chains, chains);
}
