import { AlarmReadModel } from '../../domain/read-models/alarm.read-model';

export abstract class UpserMaterializedAlarmRepository {
  abstract upsert(
    alarm: Pick<AlarmReadModel, 'id'> & Partial<AlarmReadModel>,
  ): Promise<void>;
}
