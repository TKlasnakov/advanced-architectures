import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlarmsModule } from './alarms/application/alarms.module';
import { AlarmFactory } from './alarms/domain/factories/alarm.factory';
import { CoreModule } from './core/core.module';
import { ApplicationBootstrapOptions } from './common/interfaces/application-bootstrap-options.interface';
import { AlarmInfrastructureModule } from './alarms/infrastructure/persistence/alarms-infrastructure.module';

@Module({
  imports: [CoreModule],
  controllers: [AppController],
  providers: [AppService, AlarmFactory],
})
export class AppModule {
  static register(options: ApplicationBootstrapOptions) {
    return {
      module: AppModule,
      imports: [
        CoreModule.forRoot(options),
        AlarmsModule.withInfrastructure(
          AlarmInfrastructureModule.use(options.driver),
        ),
      ],
    };
  }
}
