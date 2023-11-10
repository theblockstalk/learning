import {
    AbstractPrivateKeyStore,
    AbstractSecretBox,
    ImportablePrivateKey,
    ManagedPrivateKey,
} from '@veramo/key-manager'

export class PrivateKeyStore extends AbstractPrivateKeyStore {
    importKey(args: ImportablePrivateKey): Promise<ManagedPrivateKey>

    getKey(args: { alias: string }): Promise<ManagedPrivateKey>

    deleteKey(args: { alias: string }): Promise<boolean>

    listKeys(args: {}): Promise<Array<ManagedPrivateKey>>
}  
