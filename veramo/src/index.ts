import { createCredential, verifyCredential } from "./credentials";
import { createIdentifiers, listIdentifiers } from "./identifiers";
import { listPrivateKeys } from "./keys";

async function main() {
    await listIdentifiers()
    await createIdentifiers()
    await listIdentifiers()
    await listPrivateKeys()

    const vcSignedByKey = await createCredential({ alias: 'key-default', provider: 'did:key' })
    await verifyCredential(vcSignedByKey)


    const vcSignedByJwk = await createCredential({ alias: 'jwk-default', provider: 'did:jwk' })
    await verifyCredential(vcSignedByJwk)
}

Promise.resolve(main()).catch(console.error)