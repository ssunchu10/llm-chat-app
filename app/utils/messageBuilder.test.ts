import { buildApiMessages } from '@app/utils/messageBuilder';
import type { ChatMessage } from '@app/types/chat';

describe('buildApiMessages', () => {
  it('should convert "model" role to "assistant"', () => {
    const input: ChatMessage[] = [
      { role: 'model', content: 'Hi there' },
      { role: 'user', content: 'Hello!' }
    ];

    const result = buildApiMessages(input, 'What can you do?');

    expect(result).toEqual([
      { role: 'assistant', content: 'Hi there' },
      { role: 'user', content: 'Hello!' },
      { role: 'user', content: 'What can you do?' }
    ]);
  });

  it('should preserve roles other than "model"', () => {
    const input: ChatMessage[] = [
      { role: 'system', content: 'You are an AI.' },
      { role: 'user', content: 'Hi' }
    ];

    const result = buildApiMessages(input, 'Tell me a joke.');

    expect(result).toEqual([
      { role: 'system', content: 'You are an AI.' },
      { role: 'user', content: 'Hi' },
      { role: 'user', content: 'Tell me a joke.' }
    ]);
  });

  it('should handle empty messages array', () => {
    const result = buildApiMessages([], 'Start chat');
    expect(result).toEqual([{ role: 'user', content: 'Start chat' }]);
  });
});
