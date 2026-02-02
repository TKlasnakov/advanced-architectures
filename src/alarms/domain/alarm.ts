import { AlarmSeverity } from './value-object/alarm-severity';

export class Alarm {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly severity: AlarmSeverity,
  ) {}
}
