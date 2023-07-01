import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 6, b: 3, action: Action.Add });
    expect(result).toBe(9);
  });

  test('should substract two numbers', () => {
    const result = simpleCalculator({ a: 6, b: 3, action: Action.Substract });
    expect(result).toBe(3);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 3, b: 2, action: Action.Multiply });
    expect(result).toBe(6);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 8, b: 2, action: Action.Divide });
    expect(result).toBe(4);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 3,
      b: 2,
      action: Action.Exponentiate,
    });
    expect(result).toBe(9);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({
      a: 1,
      b: 3,
      action: 'invalid action',
    });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({
      a: 3,
      b: '5',
      action: Action.Exponentiate,
    });
    expect(result).toBeNull();
  });
});
