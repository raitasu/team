interface ImportMetaEnv {
  readonly VITE_API_HOST: string;
  readonly VITE_ALFRED_URL: string;
  readonly VITE_ALFRED_REDIRECT_URI: string;
  readonly VITE_ALFRED_CLIENT_ID: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_USE_MOCK_SERVER?: 'true';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
