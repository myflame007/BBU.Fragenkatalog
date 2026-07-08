import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { powerApps } from '@microsoft/power-apps-vite/plugin';
import fs from 'fs';
import path from 'path';

/**
 * A tiny plugin to ensure that the required .power schema files exist during build.
 * If they are missing (e.g. in a fresh CI environment), it creates dummy files
 * to satisfy Vite's import analysis.
 */
const powerSchemaFallback = (): Plugin => {
  return {
    name: 'power-schema-fallback',
    configResolved() {
      const schemaPath = path.resolve(__dirname, '.power/schemas/appschemas/dataSourcesInfo.ts');
      const dirPath = path.dirname(schemaPath);

      if (!fs.existsSync(schemaPath)) {
        console.log('[vite] Creating fallback power schema at:', schemaPath);
        if (!fs.existsSync(dirPath)) {
          fs.mkdirSync(dirPath, { recursive: true });
        }
        fs.writeFileSync(schemaPath, 'export const dataSourcesInfo = {};\n');
      }
    }
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler', { target: '18' }]],
      },
    }),
    powerApps(),
    powerSchemaFallback(),
  ],
  server: {
    allowedHosts: ['.csb.app']
  }
});
