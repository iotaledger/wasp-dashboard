import { ServiceFactory, LocalStorageService, EventAggregator } from "../../classes";

/**
 * Class the help with themes.
 */
export class ThemeService {
    public static readonly ServiceName = "ThemeService";

    /**
     * The theme.
     */
    private _theme: string;

    /**
     * Create a new instance of ThemeService.
     */
    constructor() {
        this._theme = "light";
    }

    /**
     * Initialize the theme.
     */
    public initialize(): void {
        const storageService = ServiceFactory.get<LocalStorageService>(LocalStorageService.ServiceName);

        const theme = storageService.load<string>("theme");

        this.apply(theme, false);
    }

    /**
     * Apply a theme.
     * @param theme The theme to apply.
     * @param save Save the theme.
     */
    public apply(theme: string, save: boolean): void {
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
    public get(): string {
        return this._theme;
    }

    /**
     * Save theme.
     */
    public save(): void {
        const storageService = ServiceFactory.get<LocalStorageService>(LocalStorageService.ServiceName);
        storageService.save("theme", this._theme);
    }
}