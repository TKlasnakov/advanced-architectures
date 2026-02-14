import { VersionedAggregateRoot } from 'src/shared/domain/aggregate-root';
import { AlarmItem } from './alarm-item';
import { AlarmSeverity } from './value-object/alarm-severity';

export class Alarm extends VersionedAggregateRoot {
  public triggeredAt: Date;
  public isAcknowledged = false;
  public items = new Array<AlarmItem>();
  public name: string;
  public severity: AlarmSeverity;

  constructor(public id: string) {
    super();
  }

  acknowledged() {
    this.isAcknowledged = true;
  }

  addAlarmItem(item: AlarmItem) {
    this.items.push(item);
  }
}
