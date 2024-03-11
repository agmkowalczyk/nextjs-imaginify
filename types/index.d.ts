declare type CreateUserParams = {
  clerkId: string
  email: string
  username: string
  firstName: string
  lastName: string
  photo: string
}

declare type UpdateUserParams = {
  firstName: string
  lastName: string
  username: string
  photo: string
}

declare type TransformationTypeKey =
  | 'restore'
  | 'fill'
  | 'remove'
  | 'recolor'
  | 'removeBackground'

declare type SearchParamProps = {
  params: { id: string; type: TransformationTypeKey }
  searchParams: { [key: string]: string | string[] | undefined }
}

declare type TransformationFormProps = {
  action: 'Add' | 'Update'
  userId: string
  type: TransformationTypeKey
  creditBalance: number
  data?: IImage | null
  config?: Transformations | null
}

declare type Transformations = {
  restore?: boolean
  fillBackground?: boolean
  remove?: {
    prompt: string
    removeShadow?: boolean
    multiple?: boolean
  }
  recolor?: {
    prompt?: string
    to: string
    multiple?: boolean
  }
  removeBackground?: boolean
}

declare type AddImageParams = {
  image: {
    title: string
    publicId: string
    transformationType: string
    width: number
    height: number
    config: any
    secureURL: string
    transformationURL: string
    aspectRatio: string | undefined
    prompt: string | undefined
    color: string | undefined
  }
  userId: string
  path: string
}

declare type UpdateImageParams = {
  image: {
    _id: string
    title: string
    publicId: string
    transformationType: string
    width: number
    height: number
    config: any
    secureURL: string
    transformationURL: string
    aspectRatio: string | undefined
    prompt: string | undefined
    color: string | undefined
  }
  userId: string
  path: string
}

declare type FormUrlQueryParams = {
  searchParams: string
  key: string
  value: string | number | null
}

declare type RemoveUrlQueryParams = {
  searchParams: string
  keysToRemove: string[]
}
