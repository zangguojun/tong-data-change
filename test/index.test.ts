import { createLightApp } from '@midwayjs/mock';
import * as custom from '../src';

describe('/test/index.test.ts', () => {
  it('test component', async () => {
    const app = await createLightApp('base-record', {
      imports: [
        custom
      ]
    });
    const dataSourceManager = await app.getApplicationContext().getAsync(custom.dataSourceManager);
    expect(await dataSourceManager).toBeDefined();
  });
});
