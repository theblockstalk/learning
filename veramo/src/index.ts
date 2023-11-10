import { createCredential } from "./create-credential";
import { createIdentifier } from "./create-identifier";
import { listIdentifiers } from "./list-identifiers";
import { verifyCredential } from "./verify-credential";

async function main() {
    await listIdentifiers()
    await createIdentifier()
    await listIdentifiers()

    await createCredential()
    await verifyCredential()
}

Promise.resolve(main()).catch(console.error)