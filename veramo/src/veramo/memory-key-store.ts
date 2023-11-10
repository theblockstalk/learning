import { IKeyValueStore, IKeyValueStoreOptions, KeyValueStore } from '@veramo/kv-store'
import { AbstractKeyStore } from '@veramo/key-manager'
import { IKey, ManagedKeyInfo } from '@veramo/core-types'

const options: IKeyValueStoreOptions<Partial<IKey>> = {
    namespace: 'key',
    store: new Map<string, Partial<IKey>>()
}

export class MemoryKeyStore extends AbstractKeyStore {
    // keys: IKeyValueStore<Partial<IKey>> = new KeyValueStore(options)
    keys: Map<string, Partial<IKey>> = new Map()

    async importKey(args: Partial<IKey>): Promise<boolean> {
        if (!args.kid) throw TypeError('kid is required')
        const key = {
            kid: args.kid,
            publicKeyHex: args.publicKeyHex,
            type: args.type,
            kms: args.kms,
            meta: args.meta
        }

        const existingKey = await this.keys.get(key.kid)
        if (existingKey) {
            if (existingKey.privateKeyHex !== key.publicKeyHex && existingKey.type !== key.type) {
                throw new Error(
                    `key_already_exists: A key with this alias exists but with different data. Please use a different alias.`,
                )
            } else {
                true
            }
        }

        this.keys.set(key.kid, key)

        return true
    }

    async getKey(args: { kid: string }): Promise<IKey> {
        const key = await this.keys.get(args.kid)
        if (!key) throw Error('Key not found')
        return key as IKey
    }

    async deleteKey(args: { kid: string }): Promise<boolean> {
        const key = this.keys.get(args.kid)
        if (!key) throw Error('Key not found')
        this.keys.delete(args.kid)
        return true
    }

    async listKeys(args: {}): Promise<Array<ManagedKeyInfo>> {
        // throw new Error('Method not implemented.')
        // from when this.keys was a pure Map()
        return Array.from(await this.keys.values()) as Array<ManagedKeyInfo>
    }
}