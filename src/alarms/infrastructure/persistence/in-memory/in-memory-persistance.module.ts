import { Module } from '@nestjs/common';
import { InMemoryRepository } from './repositories/in-memory.repository';
import { CreateAlarmRepository } from '../../../application/ports/create-alarm.repository';
import { FindAlarmRepository } from '../../../application/ports/find-alarms.repository';
import { UpserMaterializedAlarmRepository } from '../../../application/ports/upsert-materialized-alarm.repository';

@Module({
  providers: [
    InMemoryRepository,
    {
      provide: CreateAlarmRepository,
      useExisting: InMemoryRepository,
    },
    {
      provide: FindAlarmRepository,
      useExisting: InMemoryRepository,
    },
    {
      provide: UpserMaterializedAlarmRepository,
      useExisting: InMemoryRepository,
    },
  ],
  exports: [
    CreateAlarmRepository,
    FindAlarmRepository,
    UpserMaterializedAlarmRepository,
  ],
})
export class InMemoryPersistanceModule {}
