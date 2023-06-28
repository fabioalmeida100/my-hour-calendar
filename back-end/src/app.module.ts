import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { JwtAuthGuard } from './middleware/jwt-auth-guard';
import { EventsController } from './events/events.controller';
import { EventsService } from './events/events.service';

@Module({
  imports: [
    JwtModule.register({
      secret: '53af998d7ce952a218fda026537937e3',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AppController, AuthController, EventsController],
  providers: [AppService, AuthService, JwtAuthGuard, EventsService],
})
export class AppModule {}
