import { EventAggregator, LocalStorageService, ServiceFactory } from "../../classes";

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
     * The theme.
     */
    private _theme: string;

    /**
     * Create a new instance of SettingsService.
     */
    constructor() {
        this._storageService = ServiceFactory.get<LocalStorageService>(LocalStorageService.ServiceName);
        this._theme = "light";
    }

    /**
     * Initialize the theme.
     */
    public initialize(): void {
        const theme = this._storageService.load<string>("theme");

        this.applyTheme(theme, false);
    }

    /**
     * Apply a theme.
     * @param theme The theme to apply.
     * @param save Save the theme.
     */
    public applyTheme(theme: string, save: boolean): void {
        const currentTheme = this._theme;
        this._theme = theme ?? "light";

        document.body.classList.remove(`theme-${currentTheme}`);
        document.body.classList.add(`theme-${this._theme}`);

        EventAggregator.publish("theme", this._theme);

        if (save) {
            this.save();
        }
    }

    /**
     * Get the theme.
     * @returns The theme.
     */
    public getTheme(): string {
        return this._theme;
    }

    /**
     * Save all the settings.
     */
    public save(): void {
        this._storageService.save("theme", this._theme);
    }
}
