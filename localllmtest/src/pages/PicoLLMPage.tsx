import React, { useEffect } from 'react';
import { picollm } from '../localllms/picollm';

export const PicoLLMPage: React.FC = () => {

  const onClick = () => {
    const modelFile = document.getElementById("modelFile") as HTMLInputElement;
    const modelFileValue = modelFile.files?.[0];
    if (!modelFileValue) return;

    picollm(modelFileValue);
  }
  return (
    <div>
      <h1>PicoLLM Page</h1>
      <p>Make sure you have set the PICO_ACCESS_KEY when starting the app</p>
      <input id="modelFile" type="file" accept="pllm" />
      <button onClick={onClick}>Generate</button>

    </div>
  );
};
