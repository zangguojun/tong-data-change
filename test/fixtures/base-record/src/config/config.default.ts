import {join} from 'path';
import { UserEntity } from '../user.entity';
import { UserSubscriber } from '../user.subscriber';

export default (appInfo) => {
  return {
    typeorm: {
      dataSource: {
        customAAA: {
          type: 'sqlite',
          synchronize: true,
          database: join(__dirname, '../../test.sqlite'),
          logging: true,
          entities: [UserEntity],
          // FIXME： 只要开启这行就报错
          subscribers: [UserSubscriber],
        }
      },
    },
    record: {
      connectName: 'customAAA'
    }
  }
}
