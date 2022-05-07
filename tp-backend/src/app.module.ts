import {HttpModule} from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import {UserSchema} from "./schemas/user.schema";
import {DbService} from "./services/db.service";
import {UserController} from "./controllers/user.controller";
import {ConnectionsController} from "./controllers/connections.controller";
import {Module} from "@nestjs/common";

const credentials = require('../credentials.json');

@Module({
  imports: [
      MongooseModule.forRoot(`mongodb://${credentials.user}:${credentials.password}@116.203.151.23:27017/transport-planner`, {connectionName: 'transport-planner'}),
      MongooseModule.forFeature([
        {
          name: 'User',
          schema: UserSchema,
          collection: 'users'
        }
      ], 'transport-planner'),
      HttpModule
  ],
  controllers: [AppController, UserController, ConnectionsController],
  providers: [AppService, DbService],
})
export class AppModule {}
