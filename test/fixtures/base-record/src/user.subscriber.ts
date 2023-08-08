import { EventSubscriberModel } from '@midwayjs/typeorm';
import { EverythingSubscriber } from '../../../../src/subscriber';
import { UserEntity } from "./user.entity";

@EventSubscriberModel()
export class UserSubscriber extends EverythingSubscriber {
  listenTo(): Function | string {
    return UserEntity
  }
}
