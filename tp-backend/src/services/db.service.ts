import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { UserInfoDto } from '../dto/userInfo.dto';
import { RefreshToken } from '../entities/refresh-token.entity';
import { sign, verify } from 'jsonwebtoken';
import * as credentials from '../../credentials.json';

@Injectable()
export class DbService {
  private refreshTokens: RefreshToken[] = [];

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  getAllUsers() {
    return this.userModel.find();
  }

  async findUser(userId: string) {
    return this.userModel.findOne({ _id: userId });
  }

  createUser(user: UserInfoDto) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    return new Promise((resolve) => {
      that.checkIfUserExists(user).then((res) => {
        if (res) {
          resolve(false);
        } else {
          const createdUser = new that.userModel(user);
          createdUser.save();
          resolve(true);
        }
      });
    });
  }

  async checkIfUserExists(user: UserInfoDto): Promise<boolean> {
    return new Promise<boolean>(async (resolve) => {
      const userFound = await this.userModel.exists({ email: user.email });
      resolve(!!userFound);
    });
  }

  async getUserCredentials(user: UserInfoDto): Promise<{
    auth: boolean;
    userInfo;
    accessToken: string;
    refreshToken: string;
  }> {
    return new Promise((resolve) => {
      this.userModel
        .findOne({ email: user.email, passwordHash: user.passwordHash })
        .then((obj) => {
          if (obj) {
            this.getNewRefreshAndAccessToken(obj).then((tokens) => {
              resolve({
                auth: true,
                userInfo: {
                  username: obj.username,
                  email: obj.email,
                  passwordHash: obj.passwordHash,
                },
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
              });
            });
          } else {
            resolve({
              auth: false,
              userInfo: null,
              accessToken: null,
              refreshToken: null,
            });
          }
        });
    });
  }

  private async getNewRefreshAndAccessToken(
    user: User & { _id: string }
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const refreshObject = new RefreshToken({
      id:
        this.refreshTokens.length === 0
          ? 0
          : this.refreshTokens[this.refreshTokens.length - 1].id + 1,
      username: user.username,
      userId: user._id,
      email: user.email,
    });
    return {
      refreshToken: refreshObject.sign(),
      accessToken: sign(
        {
          userId: user._id,
        },
        credentials.accessSecret,
        {
          expiresIn: '1h',
        },
      ),
    };
  }

  public async refresh(refreshStr: string): Promise<string | undefined> {
    const refreshToken = await this.retrieveRefreshToken(refreshStr);
    if (!refreshStr) {
      return undefined;
    }
    const user = await this.findUser(refreshToken.userId);
    if (!user) {
      return undefined;
    }
    const accessToken = { userId: refreshToken.userId };
    return sign(accessToken, credentials.accessSecret, { expiresIn: '1h' });
  }

  private retrieveRefreshToken(
    refreshStr: string,
  ): Promise<RefreshToken | undefined> {
    try {
      const decoded = verify(refreshStr, credentials.refreshSecret);
      if (typeof decoded === 'string') {
        return undefined;
      }
      return Promise.resolve(
        this.refreshTokens.find((token) => token.id === decoded.id),
      );
    } catch (e) {
      return undefined;
    }
  }

  async logout(refreshStr): Promise<void> {
    const refreshToken = await this.retrieveRefreshToken(refreshStr);
    if (!refreshToken) {
      return;
    }

    this.refreshTokens = this.refreshTokens.filter(
      (token) => token.id !== refreshToken.id,
    );
  }
}
