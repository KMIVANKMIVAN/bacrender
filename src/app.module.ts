import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { RolesModule } from './roles/roles.module';
import { SucursalesModule } from './sucursales/sucursales.module';

import { EmpresasModule } from './empresas/empresas.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsuariosModule } from './usuarios/usuarios.module';
import { TipoEmpresasModule } from './tipo-empresas/tipo-empresas.module';
import { AuthModule } from './auth/auth.module';

import { JwtService } from '@nestjs/jwt';

import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot(),

    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      imports: [AuthModule],
      inject: [JwtService],

      useFactory: async (jwtService: JwtService) => ({
        playground: false,
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        plugins: [ApolloServerPluginLandingPageLocalDefault],
        context({ req }) {
          /* const token = req.headers.authorization?.replace('Bearer ','');
          if ( !token ) throw Error('Token needed');

          const payload = jwtService.decode( token );
          if ( !payload ) throw Error('Token not valid'); */
        },
      }),
    }),

    // TODO: configuración básica
    /* GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // debug: false,
      playground: false,
      autoSchemaFile: join( process.cwd(), 'src/schema.gql'),
      plugins: [
        ApolloServerPluginLandingPageLocalDefault
      ]
    }), */
    /* GraphQLModule.forRoot({
      driver: ApolloDriver,
      cors: {
        origin: '*',
        credentials: true,
      },
    }), */

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      autoLoadEntities: true,
      ssl: {
        rejectUnauthorized: false,
      }
    }),

    EmpresasModule,

    SucursalesModule,

    RolesModule,

    UsuariosModule,

    TipoEmpresasModule,

    AuthModule,

    SeedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
