import { AlarmItemEntity } from './alarm-item-entity';

export class InMemoryEntity {
  id: string;
  name: string;
  severity: string;
  triggeredAt: Date;
  isAcknowledged: boolean;
  items: Array<AlarmItemEntity>;
}
