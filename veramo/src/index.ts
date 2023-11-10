import { createCredential } from "./create-credential";
import { createIdentifier } from "./create-identifier";
import { listIdentifiers } from "./list-identifiers";
import { verifyCredential } from "./verify-credential";

async function main() {
    await listIdentifiers()
    // await createIdentifier()
    // await listIdentifiers()

    const vc = await createCredential()
    await verifyCredential(vc)
}

Promise.resolve(main()).catch(console.error)