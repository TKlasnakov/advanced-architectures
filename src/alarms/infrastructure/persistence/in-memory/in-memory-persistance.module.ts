import { Module } from '@nestjs/common';
import { AlarmRepository } from 'src/alarms/application/ports/alarm.repository';
import { InMemoryRepository } from './repositories/in-memory.repository';

@Module({
  providers: [
    {
      provide: AlarmRepository,
      useClass: InMemoryRepository,
    },
  ],
  exports: [AlarmRepository],
})
export class InMemoryPersistanceModule {}
