import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "../schemas/user.schema";
import { Model } from "mongoose";
import { UserInfoDto } from "../dto/userInfo.dto";
import { RefreshTokenEntity } from "../entities/refresh-token.entity";
import { sign, verify, JwtPayload } from "jsonwebtoken";
import * as credentials from "../../credentials.json";
import {
  RefreshToken,
  RefreshTokenDocument,
} from "../schemas/refresh-token.schema";

@Injectable()
export class DbService {
  private refreshTokens: RefreshTokenEntity[] = [];

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(RefreshToken.name)
    private refreshTokenModel: Model<RefreshTokenDocument>
  ) {}

  getAllUsers() {
    return this.userModel.find();
  }

  async findUser(userId: string) {
    return this.userModel.findOne({ _id: userId });
  }

  saveToken(token: RefreshTokenEntity): Promise<void> {
    return new Promise((resolve) => {
      const createdToken = new this.refreshTokenModel(token);
      createdToken.save().then(() => resolve());
    });
  }

  getAllTokens() {
    return this.refreshTokenModel.find();
  }

  removeToken(token: string) {
    const refreshToken = verify(token, credentials.refreshSecret);
    this.refreshTokenModel.deleteOne({ id: (refreshToken as RefreshTokenEntity).id }).then(() => {
      this.refreshTokenModel.find().then(() => {})
    });
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
    return new Promise<{ accessToken: string; refreshToken: string }>(
      (resolve) => {
        this.getAllTokens().then((refreshTokens) => {
          const refreshObject = new RefreshTokenEntity({
            id:
              refreshTokens.length === 0
                ? 0
                : refreshTokens[refreshTokens.length - 1].id + 1,
            username: user.username,
            userId: user._id,
            email: user.email,
          });
          this.saveToken(refreshObject);
          resolve({
            refreshToken: refreshObject.sign(),
            accessToken: sign(
              {
                userId: user._id,
              },
              credentials.accessSecret,
              {
                expiresIn: "1h",
              }
            ),
          });
        });
      }
    );
  }

  public async refresh(refreshStr: string): Promise<string | undefined> {
    return new Promise<string | undefined>((resolve) => {
      this.retrieveRefreshToken(refreshStr).then((token) => {
        if (!refreshStr) {
          resolve(undefined);
        }
        this.findUser((token as any)._doc.userId).then((user) => {
          if (!user) {
            resolve(undefined);
          }
          const accessToken = { userId: (token as any)._doc.userId };
          resolve(
            sign(accessToken, credentials.accessSecret, { expiresIn: "1h" })
          );
        });
      });
    });
  }

  private retrieveRefreshToken(
    refreshStr: string
  ): Promise<RefreshTokenEntity | undefined> {
    return new Promise<RefreshTokenEntity | undefined>((resolve) => {
      try {
        const decoded = verify(refreshStr, credentials.refreshSecret);
        if (typeof decoded === "string") {
          resolve(undefined);
        }
        this.getAllTokens().then((refreshTokens) => {
          const token = refreshTokens.find((token) => token.id === (decoded as JwtPayload).id);
          resolve(new RefreshTokenEntity(token));
        });
      } catch (e) {
        resolve(undefined);
      }
    });
  }

  async logout(refreshStr): Promise<void> {
    const refreshToken = await this.retrieveRefreshToken(refreshStr);
    if (!refreshToken) {
      return;
    }
    this.removeToken(refreshStr);
  }
}
