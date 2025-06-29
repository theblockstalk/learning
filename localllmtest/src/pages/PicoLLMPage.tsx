import React, { useEffect } from 'react';
import { picollm } from '../localllms/picollm';

export const PicoLLMPage: React.FC = () => {
  let rendered = false;

  useEffect(() => {
    if (!rendered) {
      picollm();
      rendered = true;
    }
  }, [rendered]);

  return (
    <div>
      <h1>PicoLLM Page</h1>
      <p>Make sure you have set the PICO_ACCESS_KEY when starting the app</p>
    </div>
  );
};
