/* eslint-disable unicorn/prefer-top-level-await */
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App";
import { ServiceFactory } from "./factories/serviceFactory";
import "./index.scss";
import { IBrandConfiguration } from "./models/IBrandConfiguration";
import { AuthService } from "./services/authService";
import { EventAggregator } from "./services/eventAggregator";
import { LocalStorageService } from "./services/localStorageService";
import { MetricsService } from "./services/metricsService";
import { NodeConfigService } from "./services/nodeConfigService";
import { PeersService } from "./services/peersServices";
import { SessionStorageService } from "./services/sessionStorageService";
import { SettingsService } from "./services/settingsService";
import { ThemeService } from "./services/themeService";
import { WaspClientService } from "./services/waspClientService";
import { WebSocketService } from "./services/webSocketService";
import { BrandHelper } from "./utils/brandHelper";

initServices()
    .then((brandConfiguration) => {
        /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
        const container = document.querySelector("#root")!;
        const root = createRoot(container);
        root.render(
            !brandConfiguration ? (
                <div>REACT_APP_BRAND_ID is not set</div>
            ) : (
                <BrowserRouter basename={process.env.PUBLIC_URL}>
                    <App />
                </BrowserRouter>
            )
        );
    })
    .catch((err) => console.error(err));

/**
 * Initialise the services.
 * @returns The brand configuration.
 */
async function initServices(): Promise<IBrandConfiguration | undefined> {
    ServiceFactory.register("local-storage", () => new LocalStorageService());
    ServiceFactory.register("session-storage", () => new SessionStorageService());
    ServiceFactory.register("wasp-client", () => new WaspClientService());
    ServiceFactory.register("peers-service", () => new WebSocketService());

    const settingsService = new SettingsService();
    ServiceFactory.register("settings", () => settingsService);

    const authService = new AuthService();
    await authService.initialize();
    ServiceFactory.register("auth", () => authService);

    const webSocketService = new WebSocketService();
    ServiceFactory.register("web-socket", () => webSocketService);

    const themeService = new ThemeService();
    themeService.initialize();
    ServiceFactory.register("theme", () => themeService);

    const nodeConfigService = new NodeConfigService();
    await nodeConfigService.initialize();
    ServiceFactory.register("node-config", () => nodeConfigService);

    const metricsService = new MetricsService();
    ServiceFactory.register("metrics", () => metricsService);
    metricsService.initialize();

    const peersService = new PeersService();
    ServiceFactory.register("peers-service", () => peersService);
    peersService.initialize();

    EventAggregator.subscribe("auth-state", "init", async () => {
        webSocketService.resubscribe();
    });

    EventAggregator.subscribe("online", "init", async (o) => {
        if (o) {
            await nodeConfigService.initialize();
            webSocketService.resubscribe();
        }
    });

    settingsService.initialize();

    return BrandHelper.initialize();
}
