import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as config from '../ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { User } from './user/user.entity';
import { UserModule } from './user/user.module';

import { Auth } from './auth/auth.entity';
import { AuthModule } from './auth/auth.module';

import { City } from './city/city.entity';
import { CityModule } from './city/city.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: config.default.host,
      port: config.default.port,
      username: config.default.user,
      password: config.default.password,
      database: config.default.schema,
      entities: [User, Auth, City], 
      synchronize: true,
      dropSchema: false,
      keepConnectionAlive: true,
    }),
    UserModule, AuthModule, CityModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}