import { IsNotEmpty, IsString } from 'class-validator';

export class UserInfoDto {
    @IsString()
    @IsNotEmpty()
    username?: string;

    @IsString()
    @IsNotEmpty()
    email?: string;

    @IsString()
    @IsNotEmpty()
    passwordHash: string;
}
