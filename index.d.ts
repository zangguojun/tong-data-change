export * from './dist/index';

declare module '@midwayjs/core/dist/interface' {
  interface MidwayConfig {
    record?: {
      connectName: string;
    };
  }
}
