import * as typeorm from '@midwayjs/typeorm';
import { Config, Configuration, IMidwayContainer, Inject } from "@midwayjs/core";
import { TypeORMDataSourceManager } from './dataSourceManager';

@Configuration({
  namespace: 'record',
  imports: [typeorm],
})
export class RecordConfiguration {
  @Inject()
  dataSourceManager: TypeORMDataSourceManager;

  @Config('record')
  recordConfig;

  async onReady(container: IMidwayContainer) {
    const { connectName } = this.recordConfig;

    const dataSource = this.dataSourceManager.getDataSource(connectName);
    // test_record 和 src/record.entity.ts中的@Entity('test_record')必须一致
    const recordRepository = dataSource.getRepository('test_record');
    // TODO：这里明明可以使用呀，为啥到src/subscriber.ts里面Inject就不行？
    // const a = await recordRepository.save({
    //   text: 'xxxx'
    // })
    // console.log('🚀~ 22 onReady recordRepository', a)
    container.registerObject('recordRepository', recordRepository);
  }
}
