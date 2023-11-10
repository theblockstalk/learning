import { agent, privateKeyStore } from './veramo/setup'

export async function listPrivateKeys() {
    const identifiers = await agent.didManagerFind()

    const kids: string[] = []
    identifiers.map(id => id.keys.map(key => kids.push(key.kid)))
    console.log(`Keys: ${kids}`)

    kids.map(async kid => {
        const key = await privateKeyStore.getKey({ alias: kid })
        console.log(`PrivateKey: ${JSON.stringify(key, null, 2)}`)
    })
}