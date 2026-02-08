import { AlarmSeverity } from '../../../../domain/value-object/alarm-severity';
import { Alarm } from '../../../../domain/alarm';
import { InMemoryEntity } from '../entity/in-memory.entity';
import { AlarmItem } from '../../../../domain/alarm-item';
import { AlarmItemEntity } from '../entity/alarm-item-entity';

export class InMemoryMapper {
  static toDomain(alarmEntity: InMemoryEntity): Alarm {
    const alarmSeverity = new AlarmSeverity(
      alarmEntity.severity as 'critical' | 'low' | 'medium' | 'high',
    );

    const alarmModel = new Alarm(alarmEntity.id);
    alarmModel.name = alarmEntity.name;
    alarmModel.isAcknowledged = alarmEntity.isAcknowledged;
    alarmModel.severity = alarmSeverity;
    alarmModel.triggeredAt = alarmEntity.triggeredAt;
    alarmModel.items = alarmEntity.items.map(
      (item) => new AlarmItem(item.id, item.name, item.type),
    );

    return alarmModel;
  }

  static toPersistance(alarm: Alarm): InMemoryEntity {
    const entity = new InMemoryEntity();
    entity.id = alarm.id;
    entity.name = alarm.name;
    entity.severity = alarm.severity.value;
    entity.isAcknowledged = alarm.isAcknowledged;
    entity.triggeredAt = alarm.triggeredAt;
    entity.items = alarm.items.map((item) => {
      const itemEnitiy = new AlarmItemEntity();
      itemEnitiy.id = item.id;
      itemEnitiy.name = item.name;
      itemEnitiy.type = item.type;

      return itemEnitiy;
    });

    return entity;
  }
}
