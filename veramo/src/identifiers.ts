import { agent } from './veramo/setup'

export async function createIdentifiers() {
    const identifierKey = await agent.didManagerCreate({ alias: 'key-default', provider: 'did:key' })
    console.log(`New identifier created`)
    console.log(JSON.stringify(identifierKey, null, 2))
    console.info(`DID length: ${identifierKey.did.length}`)

    const identifierJwk = await agent.didManagerCreate({ alias: 'jwk-default', provider: 'did:jwk' })
    console.log(`New identifier created`)
    console.log(JSON.stringify(identifierJwk, null, 2))
    console.info(`DID length: ${identifierJwk.did.length}`)

}

export async function listIdentifiers() {
    const identifiers = await agent.didManagerFind()

    console.log(`There are ${identifiers.length} identifiers`)

    if (identifiers.length > 0) {
        identifiers.map((id) => {
            console.log(JSON.stringify(id, null, 2))
            console.log('..................')
        })
    }
}