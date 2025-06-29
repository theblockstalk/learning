import React, { useEffect, useState } from 'react';
import { webllm } from '../localllms/webllm';

export const WebLLMPage: React.FC = () => {
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    if (!rendered) {
      webllm();
      setRendered(true);
    }
  }, [rendered]);

  return (
    <div>
      <h1>WebLLM Page</h1>
    </div>
  );
};
