import { defineConfig } from 'cypress';

export default defineConfig({
  chromeWebSecurity: false,
  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'junit/cypress-[hash].xml'
  },

  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite'
    }
  },

  e2e: {
    baseUrl: 'https://localhost:3000',
    experimentalSessionAndOrigin: true,
    env: {
      ALFRED_HOST: 'https://alfred.cybergizer.com'
    }
  }
});
