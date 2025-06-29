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
    </div>
  );
};
