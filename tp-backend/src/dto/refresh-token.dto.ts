import { IsNotEmpty, IsString } from "class-validator";

export class RefreshTokenDto {
  @IsNotEmpty()
  @IsString()
  id: number;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  email: string;


}
