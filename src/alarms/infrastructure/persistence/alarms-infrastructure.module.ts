import { Module } from '@nestjs/common';
import { OrmAlarmPersistanceModule } from './orm/orm-persistence.module';
import { InMemoryPersistanceModule } from './in-memory/in-memory-persistance.module';

type AlarmDriver = 'orm' | 'in-memory';

@Module({})
export class AlarmInfrastructureModule {
  static use(driver: AlarmDriver) {
    const persistanceModule =
      driver === 'orm' ? OrmAlarmPersistanceModule : InMemoryPersistanceModule;

    return {
      module: AlarmInfrastructureModule,
      imports: [persistanceModule],
      exports: [persistanceModule],
    };
  }
}
