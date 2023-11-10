import { createAgent, ICredentialPlugin, IDataStore, IDataStoreORM, IDIDManager, IKeyManager, IResolver } from '@veramo/core';
import { CredentialPlugin, ICredentialIssuer } from '@veramo/credential-w3c';
import { DataStoreORM, DIDStore, KeyStore, PrivateKeyStore } from '@veramo/data-store';
import { DIDManager } from '@veramo/did-manager';
import { getDidKeyResolver, KeyDIDProvider } from '@veramo/did-provider-key';
import { getDidJwkResolver, JwkDIDProvider } from '@veramo/did-provider-jwk';
import { DIDResolverPlugin } from '@veramo/did-resolver';
import { SecretBox } from '@veramo/kms-local';
import { OrPromise } from '@veramo/utils';
import { Resolver } from 'did-resolver';
import { DB_CONNECTION_NAME, DB_ENCRYPTION_KEY, DID_PREFIX, KeyManagementSystemEnum, SupportedDidMethodEnum } from './types';
import { DataSource } from 'typeorm';
import { getDbConnection } from './data';


export const didResolver = new Resolver({
    ...getDidKeyResolver(),
    ...getDidJwkResolver(),
});


export const didMethodsSupported = Object.keys(didResolver['registry']).map(method => method.toLowerCase().replace('did:', ''));

export const didProviders = {
    [`${DID_PREFIX}:${SupportedDidMethodEnum.DID_KEY}`]: new KeyDIDProvider({
        defaultKms: KeyManagementSystemEnum.LOCAL,
    }),
    [`${DID_PREFIX}:${SupportedDidMethodEnum.DID_JWK}`]: new JwkDIDProvider({
        defaultKms: KeyManagementSystemEnum.LOCAL,
    }),
};

const dbConnection: OrPromise<DataSource> = getDbConnection(DB_CONNECTION_NAME);
const privateKeyStore: PrivateKeyStore = new PrivateKeyStore(dbConnection, new SecretBox(DB_ENCRYPTION_KEY));

const agent = createAgent<
    IDIDManager & ICredentialIssuer>({
        plugins: [
            new DIDManager({
                store: new DIDStore(dbConnection),
                defaultProvider: `${DID_PREFIX}:${SupportedDidMethodEnum.DID_KEY}`,
                providers: didProviders,
            }),
            new DIDResolverPlugin({
                resolver: didResolver,
            }),
            new CredentialPlugin(),
        ]
    })

export default agent;
