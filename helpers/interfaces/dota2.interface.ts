export interface IDota2Heroe {
  avatar?: string
  info_url?: string
  name: string
  bio: string
  atk: string
  atk_l: string
  roles: string[]
  roles_l: string[]
}

export interface IDota2HeroeImageInfo {
  avatar: string
  info_url: string
}

export type IDota2HeroeImage = Record<string, IDota2HeroeImageInfo>
