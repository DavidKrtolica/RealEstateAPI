import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// ALL IMPORTED DATABASE ORMs
import { TypeOrmModule } from '@nestjs/typeorm';
import * as config from '../ormconfig';
import { MongooseModule } from '@nestjs/mongoose';
import { Neo4jModule } from 'nest-neo4j/dist';
//USER IMPORTS - MYSQL
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
//AUTH IMPORTS - MYSQL, AUTHENTICATION USING JWT AND BCRYPT
import { Auth } from './auth/auth.entity';
import { AuthModule } from './auth/auth.module';
//CITY IMPORTS - MYSQL
import { City } from './city/city.entity';
import { CityModule } from './city/city.module';
//ROLE IMPORTS - MYSQL
import { Role } from './role/role.entity';
import { RoleModule } from './role/role.module';
//ESTATE IMPORTS - MONGODB, MISSING ROOMS ENTITY FOR RELATIONSHIP
import { EstateModule } from './estate/estate.module';
//REVIEW IMPORTS - NEO4J, MISSING MOCKED USER ENTITY FOR RELATIONSHIP
import { ReviewModule } from './review/review.module';

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
    ReviewModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}