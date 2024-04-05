export interface SearchResult {
  objects: SearchObject[]
  total: number
  time: string
}

export interface SearchObject {
  package: Package
  flags: {
    insecure: number
    unstable?: boolean
  }
  score: {
    final: number
    detail: {
      quality: number
      popularity: number
      maintenance: number
    }
  }
  searchScore: number
}

export interface Package {
  name: string
  scope: string
  version: string
  description?: string
  keywords?: string[]
  date: Date
  links: {
    npm: string
    homepage?: string
    repository?: string
    bugs?: string
  }
  author?: {
    name: string
    email?: string
    url?: string
    username?: string
  }
  publisher: Publisher
  maintainers: Publisher[]
}

export interface Publisher {
  username: string
  email: string
}
