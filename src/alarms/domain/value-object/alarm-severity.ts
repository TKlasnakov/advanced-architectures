export type AlarmSeverityType = 'critical' | 'high' | 'medium' | 'low';

export class AlarmSeverity {
  constructor(readonly value: AlarmSeverityType) {}

  equals(severity: AlarmSeverity): boolean {
    return this.value === severity.value;
  }
}
