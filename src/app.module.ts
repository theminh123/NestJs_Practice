import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ClassModule } from './class/class.module';
import { RolesGuard } from './roles/guards/roles.guard';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { GraphqlExceptionFilter } from './filter/exception.filter';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true, envFilePath: '.env'}),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      formatError: (error) =>{
        return {
          message: error.message,
          errorCode: error.extensions.errorCode,
          data: error.extensions.data,
        }
      }
    }),
    StudentModule, ClassModule, DatabaseModule,],
  controllers: [AppController],
  providers: [AppService,
    
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: GraphqlExceptionFilter,
    },
    
  ],
})
export class AppModule {}
