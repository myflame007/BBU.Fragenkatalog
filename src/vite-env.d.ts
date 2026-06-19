/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CRM_URL: string;
  readonly VITE_CRM_CLIENT_ID: string;
  readonly VITE_CRM_CLIENT_SECRET: string;
  readonly VITE_CRM_TENANT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
