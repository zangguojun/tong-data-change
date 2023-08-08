import {
  Provide,
  Config,
  Init,
  Scope,
  Inject,
  ScopeEnum,
  ApplicationContext,
  DataSourceManager,
  IMidwayContainer,
  MidwayLoggerService,
} from '@midwayjs/core';
import { DataSource } from 'typeorm';
import { RecordEntity } from './record.entity';

@Provide()
@Scope(ScopeEnum.Singleton)
export class TypeORMDataSourceManager extends DataSourceManager<DataSource> {
  @Config('typeorm')
  typeormConfig;

  @Config('record')
  recordConfig;

  @ApplicationContext()
  applicationContext: IMidwayContainer;

  @Inject()
  baseDir: string;

  @Inject()
  loggerService: MidwayLoggerService;

  @Init()
  async init() {
    const { connectName } = this.recordConfig;
    // 这里的意思是，typeorm可能有多个connectName(默认为default)，一般是不同数据库
    // 从多个connectName，选择一个，也就是对应的数据库中必须得有结构与src/record.entity.ts一致
    const dataSourceConfig ={
      dataSource: {
        [connectName]: {
          ...this.typeormConfig.dataSource[connectName],
          entities: [RecordEntity],
          subscribers: [],
        },
      },
    }
    await this.initDataSource(
      dataSourceConfig,
      this.baseDir
    );
  }

  getName(): string {
    return 'record';
  }

  protected async createDataSource(config: any): Promise<DataSource> {
    const dataSource = new DataSource(config);
    await dataSource.initialize();
    return dataSource;
  }

  protected async checkConnected(dataSource: DataSource) {
    return dataSource.isInitialized;
  }

  protected async destroyDataSource(dataSource: DataSource) {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
  }
}
