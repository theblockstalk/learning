import React from 'react';

export const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Local LLM Test</h1>
      <nav>
        <ul>
          <li>
            <a href="/webllm">WebLLM</a>
          </li>
          <li>
            <a href="/picollm">PicoLLM</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
