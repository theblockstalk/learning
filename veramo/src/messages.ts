import { agent } from './veramo/setup'

import { AbstractDIDCommTransport, DIDCommMessageHandler, IPackedDIDCommMessage } from "@veramo/did-comm";
import { AbstractMessageHandler, Message } from "@veramo/message-handler";

export async function createMessage(to: string, from: string): Promise<IPackedDIDCommMessage> {
    const message = {
        type: 'test',
        to,
        from,
        id: '123',
        body: { hello: 'world' },
    }

    const packedMessage = await agent.packDIDCommMessage({
        packing: 'authcrypt',
        message,
    })

    console.log(`New message created`)
    console.log(JSON.stringify(JSON.parse(packedMessage.message), null, 2))

    return packedMessage;
}

export async function handleMessage(message: IPackedDIDCommMessage): Promise<boolean> {
    const result = await agent.unpackDIDCommMessage(message)

    console.log(`Message unpacked`)
    console.info(`Message: ${JSON.stringify(result, null, 2)}`)
    return true
}
