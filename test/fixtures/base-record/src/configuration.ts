import { App, Configuration } from '@midwayjs/core';
import * as record from '../../../../src';
import * as typeorm from '@midwayjs/typeorm';
import { join } from 'path';
import { InjectDataSource, InjectEntityModel } from '@midwayjs/typeorm';
import { UserEntity } from './user.entity';
import { DataSource, Repository } from 'typeorm';
import { IMidwayApplication } from '@midwayjs/core';

@Configuration({
  imports: [
    record, typeorm
  ],
  importConfigs: [
    join(__dirname, './config')
  ]
})
export class ContainerConfiguration {
  @InjectEntityModel(UserEntity, 'customAAA')
  userModel: Repository<UserEntity>;

  @InjectDataSource()
  defaultDataSource: DataSource;

  @InjectDataSource('customAAA')
  namedDataSource: DataSource;

  @App()
  app: IMidwayApplication;

  async onReady() {
    expect(this.defaultDataSource).toBeDefined();
    expect(this.defaultDataSource).toEqual(this.namedDataSource);
  }
}
