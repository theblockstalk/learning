import {
    AbstractPrivateKeyStore,
    ImportablePrivateKey,
    ManagedPrivateKey,
} from '@veramo/key-manager'
import { v4 as uuid4 } from 'uuid'
import { IKeyValueStore, IKeyValueStoreOptions, KeyValueStore } from '@veramo/kv-store'

const options: IKeyValueStoreOptions<ManagedPrivateKey> = {
    namespace: 'private-key',
    store: new Map<string, ManagedPrivateKey>()
}

export class MemoryPrivateKeyStore extends AbstractPrivateKeyStore {
    // keys: IKeyValueStore<ManagedPrivateKey> = new KeyValueStore(options)
    keys: Map<string, ManagedPrivateKey> = new Map()

    async importKey(args: ImportablePrivateKey): Promise<ManagedPrivateKey> {
        const key = {
            alias: args.alias || uuid4(),
            privateKeyHex: args.privateKeyHex,
            type: args.type
        }
        const existingKey = await this.keys.get(key.alias)
        if (existingKey) {
            if (existingKey.privateKeyHex !== key.privateKeyHex && existingKey.type !== key.type) {
                throw new Error(
                    `key_already_exists: A key with this alias exists but with different data. Please use a different alias.`,
                )
            } else {
                return key;
            }
        }

        this.keys.set(key.alias, key)

        return key;
    }

    async getKey(args: { alias: string }): Promise<ManagedPrivateKey> {
        const key = await this.keys.get(args.alias)
        if (!key) throw Error('Key not found')
        return key
    }

    async deleteKey(args: { alias: string }): Promise<boolean> {
        const key = this.keys.get(args.alias)
        if (!key) throw Error('Key not found')
        this.keys.delete(args.alias)
        return true
    }

    async listKeys(args: {}): Promise<Array<ManagedPrivateKey>> {
        // throw new Error('Method not implemented.')
        // from when this.keys was a pure Map()
        return Array.from(await this.keys.values())
    }
}  
