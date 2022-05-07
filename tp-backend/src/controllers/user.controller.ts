import {Body, Controller, Get, Post, Res} from '@nestjs/common';
import {DbService} from "../services/db.service";
import {UserInfoDto} from "../dto/userInfo.dto";

@Controller('user')
export class UserController {
    constructor(private dbService: DbService) {}

    @Get('all')
    getAllUsers() {
        return this.dbService.getAllUsers();
    }

    @Post('register')
    async registerUser(@Body() body: UserInfoDto, @Res() res) {
        const auth = await this.dbService.createUser(body);
        res.send({auth: auth, errors: [!auth ? 'User already exists!' : null]});
    }

    @Post('login')
    async authenticateUser(@Body() userInfo: UserInfoDto, @Res() res) {
        const userInfos = await this.dbService.getUserCredentials(userInfo);
        res.send({
            auth: userInfos.auth,
            userInfo: userInfos.userInfo,
            errors: [!userInfos.auth ? 'Incorrect username or password!' : null],
        });
    }

}


