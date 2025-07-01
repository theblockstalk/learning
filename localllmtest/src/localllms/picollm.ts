import { PicoLLMWorker } from "@picovoice/picollm-web"
import { PROMPT_TEST } from "./common";

const PICO_ACCESS_KEY = process.env.REACT_APP_PICO_ACCESS_KEY;
// const modelFile = 'phi2-290.pllm';

export async function picollm(modelFile: File) {
    try {
        console.log('running picollm.js')

        if (!PICO_ACCESS_KEY) throw new Error("No Pico access key");

        const pllm = await PicoLLMWorker.create(
            PICO_ACCESS_KEY,
            modelFile as any,
          );

        const res = await pllm.generate(PROMPT_TEST);
        console.log(res.completion);
    } catch (error) {
        console.error(error);
    }
}