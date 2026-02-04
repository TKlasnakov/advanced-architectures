import { AlarmSeverity } from '../../../../domain/value-object/alarm-severity';
import { Alarm } from '../../../../domain/alarm';
import { InMemoryEntity } from '../entity/in-memory.entity';

export class InMemoryMapper {
  static toDomain(alarmEntity: InMemoryEntity): Alarm {
    const alarmSeverity = new AlarmSeverity(
      alarmEntity.severity as 'critical' | 'low' | 'medium' | 'high',
    );

    return new Alarm(alarmEntity.id, alarmEntity.name, alarmSeverity);
  }

  static toPersistance(alarm: Alarm): InMemoryEntity {
    const entity = new InMemoryEntity();
    entity.id = alarm.id;
    entity.name = alarm.name;
    entity.severity = alarm.severity.value;

    return entity;
  }
}
