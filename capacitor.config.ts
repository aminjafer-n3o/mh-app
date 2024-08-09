import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: process.env.CUSTOM_APP_ID ? process.env.CUSTOM_APP_ID : 'io.ionic.starter',
  appName: process.env.CUSTOM_APP_NAME ? process.env.CUSTOM_APP_NAME : 'Muslim Hands',
  webDir: 'dist'
};

export default config;
