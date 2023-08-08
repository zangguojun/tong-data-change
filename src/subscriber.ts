import { EventSubscriberModel, InjectEntityModel } from '@midwayjs/typeorm';
import { Inject } from "@midwayjs/core";
import { EntitySubscriberInterface, InsertEvent, Repository } from 'typeorm';
import { RecordEntity } from './record.entity';

@EventSubscriberModel()
export class EverythingSubscriber implements EntitySubscriberInterface {
  // TODO: 这个就行？这里源码里其实也就是我在src/configuration做的 事情呀
  @InjectEntityModel(RecordEntity)
  recordRepository2: Repository<RecordEntity>;

  // TODO:为啥recordRepository就不行
  @Inject('recordRepository')
  recordRepository: Repository<RecordEntity>;

  /**
   * Called after entity insertion.
   */
  afterInsert(event: InsertEvent<any>) {
    // 这里将event里面的一些东西，写入到recordEntity(test_record表里)
    // 如： this.recordRepository.insert('')
    // 希望外部只需要import了这个组件，就能够实现插入记录在表中记录
    console.log('🚀~ 17 afterInsert event', event.entity)
  }
}
