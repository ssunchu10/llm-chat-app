import { extractTextContent } from '@app/utils/extractTextContent';

describe('extractTextContent', () => {
  it('returns the string when input is a string', () => {
    expect(extractTextContent('Hello')).toBe('Hello');
  });

  it('returns empty string for null or undefined', () => {
    expect(extractTextContent(null)).toBe('');
    expect(extractTextContent(undefined)).toBe('');
  });

  it('handles an array of strings and nodes recursively', () => {
    const input = ['Hi ', { value: 'there' }, '!', null];
    expect(extractTextContent(input)).toBe('Hi there!');
  });

  it('extracts text from node.props.children recursively', () => {
    const input = { props: { children: ['Hello', { value: ' World' }] } };
    expect(extractTextContent(input)).toBe('Hello World');
  });

  it('returns value from node with value', () => {
    const input = { value: 'from value' };
    expect(extractTextContent(input)).toBe('from value');
  });

  it('returns joined text from children array', () => {
    const input = { children: ['part1', 'part2', { value: 'part3' }] };
    expect(extractTextContent(input)).toBe('part1part2part3');
  });

  it('falls back to String(node) if no props, value, or children', () => {
    const input = { toString: () => 'stringified' };
    expect(extractTextContent(input)).toBe('stringified');
  });

  it('returns empty string if String(node) throws', () => {
    const input = {
      toString() {
        throw new Error('fail');
      },
    };
    expect(extractTextContent(input)).toBe('');
  });
});
