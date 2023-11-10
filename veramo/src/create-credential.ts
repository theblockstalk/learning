import { agent } from './veramo/setup'

export async function createCredential() {
    const identifier = await agent.didManagerGetByAlias({ alias: 'default', provider: 'did:jwk' })

    const verifiableCredential = await agent.createVerifiableCredential({
        credential: {
            issuer: { id: identifier.did },
            credentialSubject: {
                id: 'did:web:example.com',
                you: 'Rock',
            },
        },
        proofFormat: 'jwt',
    })
    console.log(`New credential created`)
    console.log(JSON.stringify(verifiableCredential, null, 2))

    return verifiableCredential;
}
