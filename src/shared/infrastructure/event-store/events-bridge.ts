import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ChangeStreamInsertDocument } from 'mongodb';
import { EVENT_STORE_CONNECTION } from 'src/core/core.constants';
import { Model } from 'mongoose';
import { EventBus, IEvent } from '@nestjs/cqrs';
import { Event, EventDocument } from './schemas/event.schema';
import { EventDeserializer } from './deserializers/event.deserializer';

@Injectable()
export class EventsBridge
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private changeStream: { close(): Promise<void> };

  constructor(
    @InjectModel(Event.name, EVENT_STORE_CONNECTION)
    private readonly eventStore: Model<Event>,
    private readonly eventBus: EventBus,
    private readonly eventDeserializer: EventDeserializer,
  ) {}

  onApplicationBootstrap() {
    this.changeStream = this.eventStore
      .watch()
      .on('change', (change: ChangeStreamInsertDocument<EventDocument>) => {
        if (change.operationType !== 'insert') {
          return;
        }

        this.handleEventStoreChange(change);
      });
  }

  async onApplicationShutdown() {
    await this.changeStream.close();
  }

  private handleEventStoreChange(
    change: ChangeStreamInsertDocument<EventDocument>,
  ) {
    const eventInstance = this.eventDeserializer.deserialize(
      change.fullDocument,
    );

    this.eventBus.subject$.next(eventInstance.data as IEvent);
  }
}
