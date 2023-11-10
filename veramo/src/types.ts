export enum SupportedDidMethodEnum {
    // DID_ETHR = 'ethr',
    DID_KEY = 'key',
    // DID_LTO = 'lto',
    // DID_ION = 'ion',
    // DID_FACTOM = 'factom',
    DID_JWK = 'jwk',
}

export type SupportedDIDMethod = 'key' | 'jwk';

export const DID_PREFIX = 'did';

export enum KeyManagementSystemEnum {
    LOCAL = 'local',
}

export const DB_CONNECTION_NAME = 'default';
export const DB_ENCRYPTION_KEY = '29739248cad1bd1a0fc4d9b75cd4d2990de535baf5caadfdf8d8f86664aa830c';
