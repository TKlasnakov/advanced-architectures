import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from './event-store/schemas/event.schema';
import { EVENT_STORE_CONNECTION } from '../../core/core.constants';
import { EventStorePublisher } from './event-store/publishers/event-store.publisher';
import { MongoEventStore } from './event-store/mongo-event.store';
import { EventSerializer } from './event-store/serializers/event.serializer';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Event.name, schema: EventSchema }],
      EVENT_STORE_CONNECTION,
    ),
  ],
  providers: [EventSerializer, EventStorePublisher, MongoEventStore],
})
export class SharedInfrastructureModule {}
