/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { IBrandConfiguration } from "../interfaces";

export class BrandHelper {
    /**
     * The brand id from the environment.
     */
    private static readonly _brandId?: string = import.meta.env.VITE_REACT_APP_BRAND_ID;

    /**
     * The brand configuration.
     */
    private static _brandConfiguration: IBrandConfiguration;

    /**
     * Initialize the branding.
     * @returns The brand configuration.
     */
    public static async initialize(): Promise<IBrandConfiguration | undefined> {
        if (BrandHelper._brandId) {
            BrandHelper._brandConfiguration = await import(`../../assets/${BrandHelper._brandId}/brand.json`);
            document.title = `${BrandHelper._brandConfiguration.name} Dashboard`;

            return BrandHelper._brandConfiguration;
        }
        return undefined;
    }

    /**
     * Get the configuration.
     * @returns The configuration.
     */
    public static getConfiguration(): IBrandConfiguration {
        return BrandHelper._brandConfiguration;
    }

    /**
     * Get the logo for the navigation panel.
     * @param theme The current theme.
     * @returns The navigation panel logo.
     */
    public static async getLogoNavigation(theme: string): Promise<string> {
        const logo = await import(`../../assets/${BrandHelper._brandId}/themes/${theme}/logo-navigation.svg`);
        return logo.default;
    }

    /**
     * Get the logo for the home page banner.
     * @param theme The current theme.
     * @returns The banner panel logo.
     */
    public static async getBanner(theme: string): Promise<string> {
        const banner = await import(`../../assets/${BrandHelper._brandId}/themes/${theme}/banner.svg`);
        return banner.default;
    }
}
