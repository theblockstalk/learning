import React, { useState } from 'react';
import { pipeline } from '@huggingface/transformers';

export const TransformersPage: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    try {
      const generator = await pipeline('text-generation', 'gpt2');
      const result = await generator(prompt, {
        temperature: 2,
        max_new_tokens: 10,
        repetition_penalty: 1.5,
        no_repeat_ngram_size: 2,
        num_beams: 2,
        num_return_sequences: 2,
      }) as any;
      setResponse(result[0].generated_text);
    } catch (error) {
      console.error('Error generating text:', error);
      setResponse('Error generating text. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Hugging Face Transformers Demo</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here..."
          style={{
            width: '100%',
            height: '100px',
            padding: '10px',
            fontSize: '16px',
          }}
        />
      </div>

      <button
        onClick={handleGenerate}
        disabled={isLoading}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          opacity: isLoading ? 0.6 : 1,
        }}
      >
        {isLoading ? 'Generating...' : 'Generate Response'}
      </button>

      {response && (
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
          <h2>Response:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};
