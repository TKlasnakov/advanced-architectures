import { Injectable } from '@nestjs/common';
import { AlarmRepository } from '../../../../application/ports/alarm.repository';
import { Alarm } from '../../../../domain/alarm';
import { InMemoryEntity } from '../entity/in-memory.entity';
import { InMemoryMapper } from '../mappers/in-memory.mapper';
import { AlarmMapper } from '../../orm/mappers/alarm.mapper';

@Injectable()
export class InMemoryRepository extends AlarmRepository {
  private readonly alarms = new Map<string, InMemoryEntity>();

  findAll(): Promise<Alarm[]> {
    const entities = Array.from(this.alarms.values());
    return Promise.resolve(
      entities.map((item) => InMemoryMapper.toDomain(item)),
    );
  }

  async save(alarm: Alarm): Promise<Alarm> {
    const persistanceModel = AlarmMapper.toPersistance(alarm);
    this.alarms.set(persistanceModel.id, persistanceModel);

    return Promise.resolve(InMemoryMapper.toDomain(persistanceModel));
  }
}
