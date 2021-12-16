import { startDevServer } from '@cypress/vite-dev-server';
import path from 'path';
export default (
  on: (
    arg0: string,
    arg1: (options: any) => Promise<Cypress.ResolvedDevServerConfig>,
  ) => void,
  config: any,
) => {
  on('dev-server:start', async (options: any) =>
    startDevServer({
      options,
      viteConfig: {
        configFile: path.resolve(__dirname, '..', '..', 'vite.config.ts'),
      },
    }),
  );
  return config;
};
