import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { powerApps } from '@microsoft/power-apps-vite/plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), powerApps()],
  server: {
    allowedHosts: ['.csb.app']
  }
});
