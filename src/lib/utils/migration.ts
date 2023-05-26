import { ServiceFactory, LocalStorageService } from "../classes";
import { ChainData } from "../classes/services/chainsService";
import { MAX_CACHED_BLOCKS } from "../constants";
import { LocalStorageKey } from "../enums";

let storageService: LocalStorageService;

type Migration = () => void;
const MIGRATIONS: Record<number, Migration> = {
    1: migrateToVersion2,
};

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
        try {
            MIGRATIONS[version]();
            storageService.save(LocalStorageKey.PersistedDataVersion, version + 1);
        } catch {
            storageService.remove(LocalStorageKey.ShowHexAsText);
            storageService.remove(LocalStorageKey.Chains);
        }
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
    const ShowHexAsText = storageService.load("showHexAsText") ?? false;

    if (chains && Object.keys(chains).length > 0) {
        const chainID = Object.keys(chains)[0];
        const blocks = [...chains[chainID].blocks].filter(Boolean);
        chains[chainID].blocks = blocks.length > MAX_CACHED_BLOCKS ? blocks.splice(0, MAX_CACHED_BLOCKS) : blocks;
    }
    storageService.save(LocalStorageKey.Chains, chains);

    if (ShowHexAsText) {
        storageService.remove("showHexAsText");
        storageService.save(LocalStorageKey.ShowHexAsText, ShowHexAsText);
    }
}
