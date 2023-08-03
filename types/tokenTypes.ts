export enum GrantTypes {
  AuthorizationCode = 'authorization_code',
  ClientCredentials = 'client_credentials',
}

export interface TokenRequestPayloadType {
  grant_type: GrantTypes

  // authorization_code grant type
  authorization_code: string

  // client_credentials grant type
  client_id: number
  client_secret?: string
}
