import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import * as config from '../ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { User } from './user/user.entity';
import { UserModule } from './user/user.module';

import { Auth } from './auth/auth.entity';
import { AuthModule } from './auth/auth.module';

import { City } from './city/city.entity';
import { CityModule } from './city/city.module';

import { Role } from './role/role.entity';
import { RoleModule } from './role/role.module';

import { EstateModule } from './estate/estate.module';

import { Neo4jModule } from 'nest-neo4j';
import { ReviewController } from './review/review.controller';

@Module({
  imports: [
    //MYSQL ORM (MAPPING) MODULE
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: config.default.host,
      port: config.default.port,
      username: config.default.user,
      password: config.default.password,
      database: config.default.schema,
      entities: [User, Auth, City, Role], 
      synchronize: true,
      dropSchema: false,
      keepConnectionAlive: true,
    }),
    UserModule, AuthModule, CityModule, RoleModule,
    //MONGODB MAPPING/SCHEME MODULE
    MongooseModule.forRoot('mongodb://localhost/real_estate_DB'),
    EstateModule,
    //NEO4J INTEGRATION MODULE
    Neo4jModule.forRoot({
      scheme: 'neo4j',
      host: 'localhost',
      port: 7687,
      username: 'neo4j',
      password: 'test'
    }),
  ],
  controllers: [AppController, ReviewController],
  providers: [AppService],
})
export class AppModule {}