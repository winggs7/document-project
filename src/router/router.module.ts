import { DynamicModule, ForwardReference, Module, Type } from '@nestjs/common';
import { RoutesPublicModule } from './routes/routes.public.module';
import { RoutesAdminModule } from './routes/routes.admin.module';
import { RouterModule as NestJsRouterModule } from '@nestjs/core';
import { AuthModule } from 'src/auth/auth.module';

@Module({})
export class RouterModule {
  static forRoot(): DynamicModule {
    const imports: (
      | DynamicModule
      | Type
      | Promise<DynamicModule>
      | ForwardReference
    )[] = [];

    imports.push(
      RoutesPublicModule,
      RoutesAdminModule,
      AuthModule,
      NestJsRouterModule.register([
        {
          path: 'api/v1',
          module: RoutesPublicModule,
        },
        {
          path: 'api/v1/admin',
          module: RoutesAdminModule,
        },
        {
          path: 'api/v1/auth',
          module: AuthModule,
        },
      ]),
    );

    return {
      module: RouterModule,
      providers: [],
      exports: [],
      controllers: [],
      imports,
    };
  }
}
