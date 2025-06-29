import React, { useEffect, useState } from 'react';
import { picollm } from '../localllms/picollm';

export const PicoLLMPage: React.FC = () => {
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    if (!rendered) {
      picollm();
      setRendered(true);
    }
  }, [rendered]);

  return (
    <div>
      <h1>PicoLLM Page</h1>
    </div>
  );
};
