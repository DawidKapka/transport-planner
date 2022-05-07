import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "../schemas/user.schema";
import {Model} from "mongoose";
import {UserInfoDto} from "../dto/userInfo.dto";

@Injectable()
export class DbService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

    getAllUsers() {
        return this.userModel.find();
    }

    createUser(user: UserInfoDto) {
        const that = this;
        return new Promise((resolve) => {
            that.checkIfUserExists(user).then((res) => {
                if (!res) {
                    const createdUser = new that.userModel(user);
                    createdUser.save();
                    resolve(true);
                }
                resolve(false);
            });
        });
    }

    async checkIfUserExists(user: UserInfoDto): Promise<boolean> {
        return this.userModel.findOne({'username': user.username, 'email': user.email}) === null;
    }

    async getUserCredentials(user: UserInfoDto,): Promise<{ auth: boolean; userInfo }> {
        return new Promise((resolve) => {
            this.userModel
                .findOne({ username: user.username, passwordHash: user.passwordHash })
                .then((obj) => {
                    if (obj) {
                        resolve({
                            auth: true,
                            userInfo: {
                                username: obj.username,
                                email: obj.email,
                                passwordHash: obj.passwordHash,
                            },
                        });
                    }
                    resolve({ auth: false, userInfo: null });
                });
        });
    }
}
