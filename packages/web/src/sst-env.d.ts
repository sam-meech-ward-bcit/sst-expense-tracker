/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_API_URL: string
  readonly VITE_APP_KINDE_AUDIENCE: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}