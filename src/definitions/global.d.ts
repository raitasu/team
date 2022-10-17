export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_PUBLIC_API_URL: string;
      REACT_APP_ALFRED_URL: string;
      REACT_APP_ALFRED_REDIRECT_URI: string;
      REACT_APP_ALFRED_CLIENT_ID: string;
    }
  }
}
