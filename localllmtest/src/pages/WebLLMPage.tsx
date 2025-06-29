import React, { useEffect } from 'react';
import { webllm } from '../localllms/webllm';

export const WebLLMPage: React.FC = () => {
  let rendered = false;
  
  useEffect(() => {
    if (!rendered) {
      webllm();
      rendered = true;
    }
  }, [rendered]);

  return (
    <div>
      <h1>WebLLM Page</h1>
    </div>
  );
};
