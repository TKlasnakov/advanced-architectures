import { DynamicModule, Module, Type } from '@nestjs/common';
import { AlarmsService } from './alarms.service';
import { AlarmsController } from '../presenters/http/alarms.controller';
import { AlarmFactory } from '../domain/factories/alarm.factory';
import { CreateAlarmCommandHandler } from './commands/create-alarm.command-handler';
import { GetAlarmsQueryHandler } from './queries/get-alarms.query-handler';
import { AlarmCreatedEventHandler } from './alarm-handlers/alarm-created.event-handler';

type Infrastructure = Type | DynamicModule;

@Module({
  controllers: [AlarmsController],
  providers: [
    AlarmsService,
    AlarmFactory,
    CreateAlarmCommandHandler,
    GetAlarmsQueryHandler,
    AlarmCreatedEventHandler,
  ],
})
export class AlarmsModule {
  static withInfrastructure(infrastructureModule: Infrastructure) {
    return {
      module: AlarmsModule,
      imports: [infrastructureModule],
    };
  }
}
