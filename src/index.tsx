import "./index.scss";

/* eslint-disable unicorn/prefer-top-level-await */
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App";
import {
    ServiceFactory,
    AuthService,
    EventAggregator,
    LocalStorageService,
    NodeConfigService,
    PeersService,
    SettingsService,
    WaspClientService,
    BrandHelper,
} from "./lib/classes";
import { ChainsService } from "./lib/classes/services/chainsService";
import "@fontsource/dm-sans/400.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/700.css";

initServices()
    .then(() => {
        /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
        const container = document.querySelector("#root")!;
        const root = createRoot(container);
        root.render(
            <BrowserRouter basename={import.meta.env.BASE_URL}>
                <App />
            </BrowserRouter>,
        );
    })
    .catch(err => console.error(err));

/**
 * Initialise the services.
 */
async function initServices() {
    ServiceFactory.register(LocalStorageService.ServiceName, () => new LocalStorageService());
    ServiceFactory.register(WaspClientService.ServiceName, () => new WaspClientService());

    const settingsService = new SettingsService();
    ServiceFactory.register(SettingsService.ServiceName, () => settingsService);

    const authService = new AuthService();
    await authService.initialize();
    ServiceFactory.register(AuthService.ServiceName, () => authService);

    // const webSocketService = new WebSocketService();
    // ServiceFactory.register(WebSocketService.ServiceName, () => webSocketService);

    const nodeConfigService = new NodeConfigService();
    await nodeConfigService.initialize();
    ServiceFactory.register(NodeConfigService.ServiceName, () => nodeConfigService);

    // const metricsService = new MetricsService();
    // ServiceFactory.register(MetricsService.ServiceName, () => metricsService);
    // metricsService.initialize();

    const peersService = new PeersService();
    ServiceFactory.register(PeersService.ServiceName, () => peersService);
    peersService.initialize();

    const chainsService = new ChainsService();
    ServiceFactory.register(ChainsService.ServiceName, () => chainsService);
    chainsService.initialize();

    EventAggregator.subscribe("auth-state", "init", async () => {
        // webSocketService.resubscribe();
    });

    EventAggregator.subscribe("online", "init", async o => {
        if (o) {
            await nodeConfigService.initialize();
            //    webSocketService.resubscribe();
        }
    });

    settingsService.initialize();

    BrandHelper.initialize();
}
