// eslint-disable-next-line unicorn/prefer-node-protocol
import { Buffer } from "buffer";

export class SimpleBufferCursor {
  private _buffer: Buffer;

  private _traverse: number;

  constructor(buffer: Buffer = Buffer.alloc(0)) {
    this._buffer = buffer;
    this._traverse = 0;
  }

  public get buffer(): Buffer {
    return this._buffer;
  }

  public static fromUint8Array(array: Uint8Array) {
    const buffer = Buffer.from(array);
    return new SimpleBufferCursor(buffer);
  }

  public readIntBE(length: number): number {
    const value = this._buffer.readIntBE(this._traverse, length);
    this._traverse += length;

    return value;
  }

  public readUInt32LE(): number {
    const value = this._buffer.readUInt32LE(this._traverse);
    this._traverse += 4;

    return value;
  }

  public readUInt64LE(): bigint {
    const value = this._buffer.readBigUInt64LE(this._traverse);
    this._traverse += 8;

    return value;
  }

  public readUInt16LE(): number {
    const value = this._buffer.readUInt16LE(this._traverse);
    this._traverse += 2;

    return value;
  }

  public readByte(): number {
    const singleByte = this._buffer[this._traverse];
    this._traverse += 1;

    return singleByte;
  }

  public readRemaining(): Uint8Array {
    const subBuffer = this._buffer.subarray(this._traverse);
    this._traverse += this._buffer.length;

    return subBuffer;
  }

  public readBytes(length: number): Uint8Array {
    const subBuffer = this._buffer.subarray(this._traverse, this._traverse + length);
    this._traverse += length;

    return subBuffer;
  }

  public writeIntBE(value: number, length: number): void {
    const nBuffer = Buffer.alloc(length);
    nBuffer.writeIntBE(value, 0, length);

    this._buffer = Buffer.concat([this._buffer, nBuffer]);
  }

  public writeInt8(value: number): void {
    const nBuffer = Buffer.alloc(1);
    nBuffer.writeInt8(value, 0);

    this._buffer = Buffer.concat([this._buffer, nBuffer]);
  }

  public writeUInt32LE(value: number): void {
    const nBuffer = Buffer.alloc(4);
    nBuffer.writeUInt32LE(value, 0);

    this._buffer = Buffer.concat([this._buffer, nBuffer]);
  }

  public writeUInt64LE(value: bigint): void {
    const nBuffer = Buffer.alloc(8);
    nBuffer.writeBigUInt64LE(value, 0);

    this._buffer = Buffer.concat([this._buffer, nBuffer]);
  }

  public writeUInt16LE(value: number): void {
    const nBuffer = Buffer.alloc(2);
    nBuffer.writeUInt16LE(value, 0);

    this._buffer = Buffer.concat([this._buffer, nBuffer]);
  }

  public writeBytes(bytes: Buffer): void {
    this._buffer = Buffer.concat([this._buffer, bytes]);
  }
}
