import { createCredential } from "./create-credential";
import { createIdentifiers } from "./create-identifier";
import { listIdentifiers } from "./list-identifiers";
import { listPrivateKeys } from "./list-keys";
import { verifyCredential } from "./verify-credential";

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