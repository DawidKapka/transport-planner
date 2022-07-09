import { SHA256, enc } from 'crypto-js'

export class HashService {

  public static hashPassword(password: string): string {
    return SHA256(password).toString(enc.Hex);
  }
}
