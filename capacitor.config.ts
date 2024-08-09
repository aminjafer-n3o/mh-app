import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: process.env.APP_ID ? process.env.APP_ID : 'io.ionic.starter',
  appName: process.env.APP_NAME ? process.env.APP_NAME : 'Muslim Hands',
  webDir: 'dist'
};

export default config;
