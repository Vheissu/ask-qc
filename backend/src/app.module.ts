import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionModule } from './question/question.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        QuestionModule,
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
        }),
        // TypeOrmModule.forRoot({
        //     type: 'sqlite',
        //     database: 'database.sqlite',
        //     entities: [__dirname + '/**/*.entity{.ts,.js}'],
        //     synchronize: true,
        // }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
