import * as credentials from '../../credentials.json';
import { sign } from 'jsonwebtoken';

export class RefreshTokenEntity {
  id: number;
  userId: string;
  username: string;
  email: string;

  constructor(init?: Partial<RefreshTokenEntity>) {
    Object.assign(this, init);
  }

  sign(): string {
      return sign({...this}, credentials.refreshSecret);
  }
}
