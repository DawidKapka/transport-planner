import * as credentials from '../../credentials.json';
import { sign } from 'jsonwebtoken';

export class RefreshToken {
  id: number;
  userId: string;
  username: string;
  email: string;

  constructor(init?: Partial<RefreshToken>) {
    Object.assign(this, init);
  }

  sign(): string {
      return sign({...this}, credentials.refreshSecret);
  }
}
