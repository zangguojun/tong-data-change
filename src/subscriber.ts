import { EventSubscriberModel } from '@midwayjs/typeorm';
import { Inject } from '@midwayjs/core';
import { EntitySubscriberInterface, InsertEvent, Repository } from 'typeorm';
import { RecordEntity } from './record.entity';

@EventSubscriberModel()
export class EverythingSubscriber implements EntitySubscriberInterface {
  @Inject()
  recordRepository: Repository<RecordEntity>;

  /**
   * Called after entity insertion.
   */
  afterInsert(event: InsertEvent<any>) {
    // 这里将event里面的一些东西，写入到recordEntity(test_record表里)
    // 如： this.recordRepository.insert('')
    // 希望外部只需要import了这个组件，就能够实现插入记录在表中记录
  }
}
