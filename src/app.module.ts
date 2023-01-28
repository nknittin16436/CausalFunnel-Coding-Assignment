import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './module/user.module/user.controller';
import { UserService } from './module/user.module/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { BlogController } from './module/blog.module/blog.controller';
import { BlogService } from './module/blog.module/blog.service';

// @Module({
//   imports: [TypeOrmModule.forRoot({
//     type: 'mysql',
//     host: process.env.MYSQL_HOST,
//     port: 3306,
//     username: 'root',
//     password: process.env.MYSQL_ROOT_PASSWORD,
//     database: process.env.MYSQL_DATABASE,
//     entities: [__dirname + "/**/*.entity{.ts,.js}"],
//     synchronize: true,
//   })],
//   controllers: [AppController, UserController],
//   providers: [AppService, UserService],
// })
// export class AppModule { }


@Module({
  imports: [TypeOrmModule.forRoot({
    type: "sqlite",
    database: "restaurantReview.db",
    entities: [__dirname + "/**/*.entity{.ts,.js}"],
    synchronize: true
  })],
  controllers: [ UserController,BlogController],
  providers: [ UserService,BlogService],
})
export class AppModule { }