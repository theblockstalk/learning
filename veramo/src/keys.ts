import { agent, privateKeyStore } from './veramo/setup'

export async function listPrivateKeys() {
    const identifiers = await agent.didManagerFind()

    const kids: string[] = []
    identifiers.map(id => id.keys.map(key => kids.push(key.kid)))
    console.log(`Keys: ${kids}`)

    const keys = await privateKeyStore.listKeys();
    console.log(`Private Keys: ${JSON.stringify(keys, null, 2)}`)
}