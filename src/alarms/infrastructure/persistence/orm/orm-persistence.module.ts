import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlarmEntity } from './entity/alarm.entity';
import { AlarmItemEntity } from './entity/alarm-item.entity';
import { OrmFindAlarmRepository } from './repositories/find-alarms.repository';
import { OrmCreateAlarmRepository } from './repositories/create-alarm.repository';
import { OrmUpsertMaterializedAlarmRepository } from './repositories/upsert-materialized-alarm.repository';
import { CreateAlarmRepository } from '../../../application/ports/create-alarm.repository';
import { FindAlarmRepository } from '../../../application/ports/find-alarms.repository';
import { UpserMaterializedAlarmRepository } from '../../../application/ports/upsert-materialized-alarm.repository';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MaterializedAlarmView,
  MaterializedAlarmViewSchema,
} from './schemas/materialized-alarm-view.schema';

@Module({
  imports: [
    TypeOrmModule.forFeature([AlarmEntity, AlarmItemEntity]),
    MongooseModule.forFeature([
      { name: MaterializedAlarmView.name, schema: MaterializedAlarmViewSchema },
    ]),
  ],
  providers: [
    {
      provide: CreateAlarmRepository,
      useClass: OrmCreateAlarmRepository,
    },
    {
      provide: FindAlarmRepository,
      useClass: OrmFindAlarmRepository,
    },
    {
      provide: UpserMaterializedAlarmRepository,
      useClass: OrmUpsertMaterializedAlarmRepository,
    },
  ],
  exports: [
    CreateAlarmRepository,
    FindAlarmRepository,
    UpserMaterializedAlarmRepository,
  ],
})
export class OrmAlarmPersistanceModule {}
