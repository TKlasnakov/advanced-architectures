import { Injectable } from '@nestjs/common';
import { CreateAlarmRepository } from '../../../../application/ports/create-alarm.repository';
import { Alarm } from '../../../../domain/alarm';
import { InMemoryEntity } from '../entity/in-memory.entity';
import { InMemoryMapper } from '../mappers/in-memory.mapper';
import { AlarmMapper } from '../../orm/mappers/alarm.mapper';
import { FindAlarmRepository } from 'src/alarms/application/ports/find-alarms.repository';
import { UpserMaterializedAlarmRepository } from 'src/alarms/application/ports/upsert-materialized-alarm.repository';
import { AlarmReadModel } from 'src/alarms/domain/read-models/alarm.read-model';

@Injectable()
export class InMemoryRepository
  implements
    CreateAlarmRepository,
    FindAlarmRepository,
    UpserMaterializedAlarmRepository
{
  private readonly alarms = new Map<string, InMemoryEntity>();
  private readonly materializedAlarmViews = new Map<string, AlarmReadModel>();

  findAll(): Promise<AlarmReadModel[]> {
    return Promise.resolve(Array.from(this.materializedAlarmViews.values()));
  }

  async save(alarm: Alarm): Promise<Alarm> {
    const persistanceModel = AlarmMapper.toPersistance(alarm);
    this.alarms.set(persistanceModel.id, persistanceModel);

    return Promise.resolve(InMemoryMapper.toDomain(persistanceModel));
  }

  async upsert(alarm: AlarmReadModel): Promise<void> {
    if (this.materializedAlarmViews.has(alarm.id)) {
      this.materializedAlarmViews.set(alarm.id, {
        ...this.materializedAlarmViews.get(alarm.id),
        ...alarm,
      });
      return Promise.resolve();
    }

    this.materializedAlarmViews.set(alarm.id, alarm);
  }
}
