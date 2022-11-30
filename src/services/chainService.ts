import { ServiceFactory } from "../factories/serviceFactory";
import { WaspClientService } from "./waspClientService";

export class ChainService {
  private readonly _waspClientService: WaspClientService;

  constructor() {
    this._waspClientService = ServiceFactory.get<WaspClientService>("wasp-client");
  }

  public async getAccounts(chainId: string) {
    const contractName: string = "accounts";
    const functionName: string = "accounts";

    const result = await this._waspClientService.requests().callView({
      contractCallViewRequest: {
        chainID: chainId,
        contractName,
        functionName
      }
    });

    console.log(result);
  }
}
