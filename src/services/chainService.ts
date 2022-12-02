import { Bech32 } from "@iota/crypto.js";
import { Bech32Helper, deserializeAddress, Ed25519Address, ED25519_ADDRESS_TYPE, IAddress, IEd25519Address } from "@iota/iota.js";
import { Base64, Converter, ReadStream } from "@iota/util.js";
import { ServiceFactory } from "../factories/serviceFactory";
import { SimpleBufferCursor } from "../utils/simple_buffer_cursor";
import { WaspClientService } from "./waspClientService";

export interface Account {
  agentID: string;
  value: string;
}

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

    const accounts: string[] = [];

    if (!result.items) {
      return accounts;
    }

    for (const account of result.items) {
      if (!account.key || !account.value) {
        continue;
      }

      const bufferReader = SimpleBufferCursor.fromUint8Array(Base64.decode(account.key));

      const waspAddressType = bufferReader.readByte();
      const l1AddressType = bufferReader.readByte();
      const address = bufferReader.readRemaining();

      if (l1AddressType === ED25519_ADDRESS_TYPE) {
        const bechAddress = Bech32Helper.toBech32(l1AddressType, address, "tst");

        accounts.push(bechAddress);
      }
    }

    return accounts;
  }
}
