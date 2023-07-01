import { simpleCalculator, Action } from './index';

const testCases = [
  //ADD
  { a: 1, b: 3, action: Action.Add, expected: 4 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 1, action: Action.Add, expected: 4 },
  //SUBSTRACT
  { a: 1, b: 3, action: Action.Substract, expected: -2 },
  { a: 2, b: 2, action: Action.Substract, expected: 0 },
  { a: 3, b: 1, action: Action.Substract, expected: 2 },
  //MULTIPLY
  { a: 1, b: 3, action: Action.Multiply, expected: 3 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 3, b: 1, action: Action.Multiply, expected: 3 },
  //DIVIDE
  { a: 9, b: 3, action: Action.Divide, expected: 3 },
  { a: 8, b: 2, action: Action.Divide, expected: 4 },
  { a: 7, b: 1, action: Action.Divide, expected: 7 },
  //ESPONENTIATE
  { a: 1, b: 1, action: Action.Exponentiate, expected: 1 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },
  //RETURN NULL (ACTION)
  { a: 1, b: 3, action: 'action', expected: null },
  { a: 2, b: 2, action: undefined, expected: null },
  { a: 3, b: 1, action: null, expected: null },
  //RETURN NULL (ARG)
  { a: 1, b: '3', action: Action.Exponentiate, expected: null },
  { a: 2, b: null, action: Action.Exponentiate, expected: null },
  { a: 3, b: undefined, action: Action.Exponentiate, expected: null },
];

describe('simpleCalculator', () => {
  test('should return expected', () => {
    testCases.forEach((test) => {
      const { a, b, action, expected } = test;
      const result = simpleCalculator({
        a: a,
        b: b,
        action: action,
      });
      if (expected === null) {
        expect(result).toBeNull();
      } else {
        expect(result).toEqual(expected);
      }
    });
  });
});
