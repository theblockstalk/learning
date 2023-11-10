import { VerifiableCredential } from '@veramo/core'
import { agent } from './veramo/setup'

export async function verifyCredential(vc: VerifiableCredential) {
    const result = await agent.verifyCredential({
        credential: vc
    })
    console.log(`Credential verified`, result.verified)
}
