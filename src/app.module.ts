import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlarmsModule } from './alarms/application/alarms.module';
import { AlarmFactory } from './alarms/domain/factories/alarm.factory';

@Module({
  imports: [AlarmsModule],
  controllers: [AppController],
  providers: [AppService, AlarmFactory],
})
export class AppModule {}
