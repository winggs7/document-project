import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configs from './configs';
import { MongooseModule } from '@nestjs/mongoose';
import { TerminusModule } from '@nestjs/terminus';
import { RouterModule } from './router/router.module';
import { HealthController } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: configs,
      isGlobal: true,
      cache: true,
      envFilePath: ['.env'],
      expandVariables: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    TerminusModule,
    RouterModule.forRoot(),
  ],
  controllers: [],
  providers: [HealthController],
})
export class AppModule {}
