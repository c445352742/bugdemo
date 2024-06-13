import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'mobile',
  webDir: 'dist',
  server: {
    androidScheme: 'http'
  },
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
    
  },
};

export default config;
