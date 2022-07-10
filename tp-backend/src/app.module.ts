import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { DbService } from './services/db.service';
import { UserController } from './controllers/user.controller';
import { ConnectionsController } from './controllers/connections.controller';
import { Module } from '@nestjs/common';
import { StationsController } from './controllers/stations.controller';
import { ConfigModule } from '@nestjs/config';
import * as credentials from '../credentials.json';
import {JwtStrategy} from "./strategies/jwt.strategy";
import {JwtAuthGuard} from "./guards/jwt-auth.guard";
import {RefreshTokenSchema} from "./schemas/refresh-token.schema";

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${credentials.user}:${credentials.password}@116.203.151.23:27017/transport-planner`,
      { connectionName: 'transport-planner' },
    ),
    MongooseModule.forFeature(
      [
        {
          name: 'User',
          schema: UserSchema,
          collection: 'users',
        },
        {
          name: 'RefreshToken',
          schema: RefreshTokenSchema,
          collection: 'refreshTokens'
        }
      ],
      'transport-planner',
    ),
    HttpModule,
    ConfigModule.forRoot(),
  ],
  controllers: [
    AppController,
    UserController,
    ConnectionsController,
    StationsController,
  ],
  providers: [AppService, DbService, JwtStrategy, JwtAuthGuard],
})
export class AppModule {}
