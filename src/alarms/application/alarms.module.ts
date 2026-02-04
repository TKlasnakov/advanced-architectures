import { DynamicModule, Module, Type } from '@nestjs/common';
import { AlarmsService } from './alarms.service';
import { AlarmsController } from '../presenters/http/alarms.controller';

type Infrastructure = Type | DynamicModule;

@Module({
  controllers: [AlarmsController],
  providers: [AlarmsService],
})
export class AlarmsModule {
  static withInfrastructure(infrastructureModule: Infrastructure) {
    return {
      module: AlarmsModule,
      imports: [infrastructureModule],
    };
  }
}
