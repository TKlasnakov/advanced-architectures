import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MaterializedAlarmView } from '../schemas/materialized-alarm-view.schema';
import { AlarmReadModel } from 'src/alarms/domain/read-models/alarm.read-model';

@Injectable()
export class OrmFindAlarmRepository {
  constructor(
    @InjectModel(MaterializedAlarmView.name)
    private readonly alarmModel: Model<MaterializedAlarmView>,
  ) {}

  async findAll(): Promise<AlarmReadModel[]> {
    return await this.alarmModel.find();
  }
}
