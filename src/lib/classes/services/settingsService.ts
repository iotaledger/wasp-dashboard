import { EventAggregator, LocalStorageService, ServiceFactory } from "../../classes";
import { LocalStorageKey } from "../../enums";

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
     * Show Hex strings as UTF8 text.
     */
    private _showHexAsText: boolean;

    /**
     * Create a new instance of SettingsService.
     */
    constructor() {
        this._storageService = ServiceFactory.get<LocalStorageService>(LocalStorageService.ServiceName);
        this._theme = "light";
        this._showHexAsText = false;
    }

    /**
     * Initialize the theme.
     */
    public initialize(): void {
        const theme = this._storageService.load<string>(LocalStorageKey.Theme);
        this.applyTheme(theme, false);

        this._showHexAsText = this._storageService.load<boolean>(LocalStorageKey.ShowHexAsText) ?? false;
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
     * Toggle the show hex as text setting.
     */
    public toggleShowHexAsText() {
        this._showHexAsText = !this._showHexAsText;
        EventAggregator.publish("showHexAsText", this._showHexAsText);
        this.save();
    }

    /**
     * Get the theme.
     * @returns The theme.
     */
    public getTheme(): string {
        return this._theme;
    }

    public showHexAsText(): boolean {
        return this._showHexAsText;
    }

    /**
     * Save all the settings.
     */
    public save(): void {
        this._storageService.save(LocalStorageKey.Theme, this._theme);
        this._storageService.save(LocalStorageKey.ShowHexAsText, this._showHexAsText);
    }
}
