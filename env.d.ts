/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_JSDELIVR_API_URL: string
  readonly VITE_NPMREG_API_URL: string
  readonly VITE_PACKAGES_PER_PAGE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
