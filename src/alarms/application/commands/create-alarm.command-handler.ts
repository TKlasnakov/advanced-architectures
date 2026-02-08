import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateAlarmCommand } from './create-alarm.command';
import { Logger } from '@nestjs/common';
import { AlarmFactory } from 'src/alarms/domain/factories/alarm.factory';
import { CreateAlarmRepository } from '../ports/create-alarm.repository';
import { AlarmCreatedEvent } from 'src/alarms/domain/events/alarm-created.event';

@CommandHandler(CreateAlarmCommand)
export class CreateAlarmCommandHandler implements ICommandHandler<CreateAlarmCommand> {
  private readonly logger = new Logger(CreateAlarmCommand.name);

  constructor(
    private readonly alarmRepository: CreateAlarmRepository,
    private readonly alarmFactory: AlarmFactory,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateAlarmCommand) {
    this.logger.log(
      `Processing "CreateAlarmCommandHandler": ${JSON.stringify(command)}`,
    );

    const alarm = this.alarmFactory.create(
      command.name,
      command.severity,
      command.triggeredAt,
      command.items,
    );

    console.log(JSON.stringify(alarm));
    const newAlarm = await this.alarmRepository.save(alarm);

    this.eventBus.publish(new AlarmCreatedEvent(alarm));

    return newAlarm;
  }
}
