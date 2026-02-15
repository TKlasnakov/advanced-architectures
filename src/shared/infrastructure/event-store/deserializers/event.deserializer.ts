import { Injectable, Type } from '@nestjs/common';
import {
  SerializableEvent,
  SerializedEventPayload,
} from '../../../domain/interfaces/serializable-event';
import { Event } from '../schemas/event.schema';
import { AlarmCreatedEvent } from '../../../../alarms/domain/events/alarm-created.event';

@Injectable()
export class EventDeserializer {
  deserialize<T>(event: Event): SerializableEvent<T> {
    const eventCls = this.getEventClassByType(event.type);
    return {
      ...event,
      data: this.instantiateSerializedEvent(
        eventCls,
        event.data as Record<string, unknown>,
      ) as SerializedEventPayload<T>,
    };
  }

  getEventClassByType(type: string): Type<unknown> {
    switch (type) {
      case AlarmCreatedEvent.name:
        return AlarmCreatedEvent;
      default:
        throw new Error(`Unknown event type: ${type}`);
    }
  }

  instantiateSerializedEvent<T extends Type>(
    eventCls: T,
    data: Record<string, unknown>,
  ): T {
    return Object.assign(
      Object.create(eventCls.prototype as object),
      data,
    ) as T;
  }
}
