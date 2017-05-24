export type byte = number;

export interface ISpiService {
  /**
   * Reads a byte from an address.
   */
  read(fromAddr: byte): byte;
  /**
   * Writes a byte of data to an address.
   */
  write(toAddr: byte, data: byte): void;
}
