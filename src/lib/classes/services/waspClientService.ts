import { Environment } from "../../../environment";
import { EventAggregator, ServiceFactory, LocalStorageService } from "../../classes";
import {
    UsersApi,
    NodeApi,
    ChainsApi,
    RequestsApi,
    MetricsApi,
    CorecontractsApi,
    Configuration,
} from "../../wasp_client";
/**
 * Class to manage the wasp API.
 */
export class WaspClientService {
    public static readonly ServiceName = "WaspClientService";

    private _apiClients?: {
        users: UsersApi;
        node: NodeApi;
        chains: ChainsApi;
        requests: RequestsApi;
        metrics: MetricsApi;
        corecontracts: CorecontractsApi;
    };

    constructor() {
        this.initialize();

        EventAggregator.subscribe("auth-state", "waspClient", isLoggedIn => {
            this.initialize();
        });
    }

    public initialize() {
        const storageService = ServiceFactory.get<LocalStorageService>(LocalStorageService.ServiceName);
        const config: Configuration = new Configuration({
            apiKey: storageService.load("dashboard-jwt"),
            basePath: Environment.WaspApiUrl,
        });

        this._apiClients = {
            users: new UsersApi(config),
            chains: new ChainsApi(config),
            node: new NodeApi(config),
            requests: new RequestsApi(config),
            metrics: new MetricsApi(config),
            corecontracts: new CorecontractsApi(config),
        };
    }

    public users(): UsersApi {
        return this._apiClients?.users as UsersApi;
    }

    public node(): NodeApi {
        return this._apiClients?.node as NodeApi;
    }

    public chains(): ChainsApi {
        return this._apiClients?.chains as ChainsApi;
    }

    public requests(): RequestsApi {
        return this._apiClients?.requests as RequestsApi;
    }

    public metrics(): MetricsApi {
        return this._apiClients?.metrics as MetricsApi;
    }

    public corecontracts(): CorecontractsApi {
        return this._apiClients?.corecontracts as CorecontractsApi;
    }
}
