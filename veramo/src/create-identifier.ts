import { agent } from './veramo/setup'

export async function createIdentifier() {
    const identifier = await agent.didManagerCreate({ alias: 'default', provider: 'did:key' })
    console.log(`New identifier created`)
    console.log(JSON.stringify(identifier, null, 2))
    console.info(`DID length: ${identifier.did.length}`)
}
