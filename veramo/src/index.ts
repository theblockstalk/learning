import { createCredential, verifyCredential } from "./credentials";
import { createIdentifiers, listIdentifiers, resolveDid } from "./identifiers";
import { listPrivateKeys } from "./keys";
import { createMessage, handleMessage } from "./messages";

async function main() {
    await listIdentifiers()
    await createIdentifiers()
    const identifiers = await listIdentifiers()
    await listPrivateKeys()

    const didKey = identifiers.find((id) => id.alias === 'key-default')?.did
    const vcSignedByKey = await createCredential({ alias: 'key-default', provider: 'did:key' })
    await verifyCredential(vcSignedByKey)

    const didJwk = identifiers.find((id) => id.alias === 'jwk-default')?.did
    const vcSignedByJwk = await createCredential({ alias: 'jwk-default', provider: 'did:jwk' })
    await verifyCredential(vcSignedByJwk)

    const didKey2 = identifiers.find((id) => id.alias === 'key-secondary')?.did
    if (!didKey || !didKey2 || !didJwk) throw new Error('No DIDs found')
    await resolveDid(didKey)
    await resolveDid(didJwk)
    // const message = await createMessage(didKey2, didKey) // FAILS: did:jwk does not have a keyAgreement key
    const message = await createMessage(didKey2, didKey)
    await handleMessage(message)
}

Promise.resolve(main()).catch(console.error)