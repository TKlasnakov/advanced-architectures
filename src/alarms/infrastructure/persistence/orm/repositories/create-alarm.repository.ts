import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlarmEntity } from '../entity/alarm.entity';
import { Repository } from 'typeorm';
import { Alarm } from 'src/alarms/domain/alarm';
import { AlarmMapper } from '../mappers/alarm.mapper';
import { CreateAlarmRepository } from 'src/alarms/application/ports/create-alarm.repository';

@Injectable()
export class OrmCreateAlarmRepository implements CreateAlarmRepository {
  constructor(
    @InjectRepository(AlarmEntity)
    private readonly alarmRepository: Repository<AlarmEntity>,
  ) {}

  async save(alarm: Alarm): Promise<Alarm> {
    const persistanceModel = AlarmMapper.toPersistance(alarm);
    const newEntity = await this.alarmRepository.save(persistanceModel);

    return AlarmMapper.toDomain(newEntity);
  }
}
