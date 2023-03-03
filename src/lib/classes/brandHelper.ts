/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import WaspBranding from "../../assets/wasp/brand.json";
import { IBrandConfiguration } from "../interfaces";

export class BrandHelper {
    /**
     * The brand configuration.
     */
    private static readonly _brandConfiguration: IBrandConfiguration = WaspBranding;

    /**
     * Initialize the branding.
     * @returns The brand configuration.
     */
    public static initialize(): IBrandConfiguration {
        document.title = `${BrandHelper._brandConfiguration.name} Dashboard`;
        return BrandHelper._brandConfiguration;
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
        const logo = await import(`../../assets/wasp/themes/${theme}/logo-navigation.svg`);
        return logo.default;
    }

    /**
     * Get the logo for the home page banner.
     * @param theme The current theme.
     * @returns The banner panel logo.
     */
    public static async getBanner(theme: string): Promise<string> {
        const banner = await import(`../../assets/wasp/themes/${theme}/banner.svg`);
        return banner.default;
    }
}
