import { AlarmSeverity } from '../../../../domain/value-object/alarm-severity';
import { AlarmEntity } from '../entity/alarm.entity';
import { Alarm } from 'src/alarms/domain/alarm';

export class AlarmMapper {
  static toDomain(alarmEntity: AlarmEntity): Alarm {
    const alarmSeverity = new AlarmSeverity(
      alarmEntity.severity as 'critical' | 'low' | 'medium' | 'high',
    );

    return new Alarm(alarmEntity.id, alarmEntity.name, alarmSeverity);
  }

  static toPersistance(alarm: Alarm): AlarmEntity {
    const entity = new AlarmEntity();
    entity.id = alarm.id;
    entity.name = alarm.name;
    entity.severity = alarm.severity.value;

    return entity;
  }
}
