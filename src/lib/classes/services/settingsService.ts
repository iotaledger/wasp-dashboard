import { LocalStorageService, ServiceFactory } from "../../classes";

/**
 * Class to use for storing settings.
 */
export class SettingsService {
    public static readonly ServiceName = "SettingsService";

    /**
     * The storage servie.
     */
    private readonly _storageService: LocalStorageService;

    /**
     * Create a new instance of SettingsService.
     */
    constructor() {
        this._storageService = ServiceFactory.get<LocalStorageService>(LocalStorageService.ServiceName);
    }

    /**
     * Initialize the service.
     */
    public initialize(): void {}
}
