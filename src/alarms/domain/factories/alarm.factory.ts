import { Alarm } from '../alarm';
import {
  AlarmSeverity,
  AlarmSeverityType,
} from '../value-object/alarm-severity';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class AlarmFactory {
  create(name: string, severity: AlarmSeverityType): Alarm {
    const alarmId = randomUUID();
    const alarmSeverity = new AlarmSeverity(severity);
    return new Alarm(alarmId, name, alarmSeverity);
  }
}
