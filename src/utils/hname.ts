import { blake2b } from "blakejs";
import { Buffer } from "node:buffer";

export class HName {
  public static hashAsString(textToHash: string): string {
    const hashNumber = HName.hashAsNumber(textToHash);
    const hashString = hashNumber.toString(16);

    return hashString;
  }

  public static hashAsBuffer(textToHash: string): Buffer {
    const buffer = Buffer.from(textToHash);
    const result = blake2b(buffer, undefined, 32);

    return Buffer.from(result);
  }

  public static hashAsNumber(textToHash: string): number {
    const bufferedHash = HName.hashAsBuffer(textToHash);
    const resultHash = Buffer.from(bufferedHash).readUInt32LE(0);

    return resultHash;
  }
}
