import {
    createAgent,
    IDIDManager,
    IResolver,
    IDataStore,
    IDataStoreORM,
    IKeyManager,
    ICredentialPlugin,
} from '@veramo/core'
import { DIDManager } from '@veramo/did-manager'
import { KeyManager } from '@veramo/key-manager'
import { KeyManagementSystem, SecretBox } from '@veramo/kms-local'
import { CredentialPlugin } from '@veramo/credential-w3c'
import { DIDResolverPlugin } from '@veramo/did-resolver'
import { Resolver } from 'did-resolver'
import { Entities, KeyStore, DIDStore, PrivateKeyStore, migrations } from '@veramo/data-store'
import { DataSource } from 'typeorm'
import { getDidKeyResolver, KeyDIDProvider } from '@veramo/did-provider-key'

const DATABASE_FILE = 'database.sqlite'
const KMS_SECRET_KEY = 'b17dfd1b648eb4113bc4f1294d5b302b3fb5425e793ccde8934896c20bdfd6e9'

const dbConnection = new DataSource({
    type: 'sqlite',
    database: DATABASE_FILE,
    synchronize: false,
    migrations,
    migrationsRun: true,
    logging: ['error', 'info', 'warn'],
    entities: Entities,
}).initialize()

export const agent = createAgent<
    IDIDManager & IKeyManager & IDataStore & IDataStoreORM & IResolver & ICredentialPlugin
>({
    plugins: [
        new KeyManager({
            store: new KeyStore(dbConnection),
            kms: {
                local: new KeyManagementSystem(new PrivateKeyStore(dbConnection, new SecretBox(KMS_SECRET_KEY))),
            },
        }),
        new DIDManager({
            store: new DIDStore(dbConnection),
            defaultProvider: 'did:key',
            providers: {
                'did:key': new KeyDIDProvider({
                    defaultKms: 'local',
                }),
            },
        }),
        new DIDResolverPlugin({
            resolver: new Resolver({
                ...getDidKeyResolver(),
            }),
        }),
        new CredentialPlugin(),
    ],
})