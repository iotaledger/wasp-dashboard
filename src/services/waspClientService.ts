import { Environment } from "../environment";
import { ServiceFactory } from "../factories/serviceFactory";
import { LocalStorageService } from "./localStorageService";
import { ChainsApi, Configuration, NodeApi, RequestsApi, UsersApi } from "./wasp_client";

/**
 * Class to manage the wasp API.
 */
export class WaspClientService {
    private _apiClients: {
        users: UsersApi;
        node: NodeApi;
        chains: ChainsApi;
        requests: RequestsApi;
    };

    constructor() {
        const storageService = ServiceFactory.get<LocalStorageService>("local-storage");
        const config: Configuration = new Configuration({
            apiKey: storageService.load("dashboard-jwt"),
            basePath: Environment.WaspApiUrl,
        });

        this._apiClients = {
            users: new UsersApi(config),
            chains: new ChainsApi(config),
            node: new NodeApi(config),
            requests: new RequestsApi(config),
        };
    }

    public initialize() {
        const storageService = ServiceFactory.get<LocalStorageService>("local-storage");
        const config: Configuration = new Configuration({
            apiKey: storageService.load("dashboard-jwt"),
            basePath: Environment.WaspApiUrl,
        });

        this._apiClients = {
            users: new UsersApi(config),
            chains: new ChainsApi(config),
            node: new NodeApi(config),
            requests: new RequestsApi(config),
        };
    }

    public users(): UsersApi {
        return this._apiClients.users;
    }

    public node(): NodeApi {
        return this._apiClients.node;
    }

    public chains(): ChainsApi {
        return this._apiClients.chains;
    }

    public requests(): RequestsApi {
        return this._apiClients.requests;
    }
}
