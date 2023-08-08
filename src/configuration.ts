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
    container.registerObject('recordRepository', recordRepository);
  }
}
