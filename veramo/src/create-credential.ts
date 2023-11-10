import { agent } from './veramo/setup'

export async function createCredential({ alias, provider }: { alias: string, provider: string }) {
    const credentialSubject = {
        id: 'did:web:example.com',
        you: 'Rock',
    }
    const identifier = await agent.didManagerGetByAlias({ alias, provider })

    const verifiableCredential = await agent.createVerifiableCredential({
        credential: {
            issuer: { id: identifier.did },
            credentialSubject
        },
        proofFormat: 'jwt',
    })
    console.log(`New credential created`)
    console.log(JSON.stringify(verifiableCredential, null, 2))
    console.info(`VC length: ${verifiableCredential.proof.jwt.length}`)

    return verifiableCredential;
}
