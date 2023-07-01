import {
  resolveValue,
  throwError,
  throwCustomError,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const text = 'some text';
    await expect(resolveValue(text)).resolves.toEqual(text);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const text = 'some text';
    expect(() => {
      throwError(text);
    }).toThrow(text);
  });

  test('should throw error with default message if message is not provided', () => {
    const text = 'Oops!';
    expect(() => {
      throwError();
    }).toThrow(text);
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    const text = 'This is my awesome custom error!';
    expect(throwCustomError).toThrow(MyAwesomeError);
    expect(throwCustomError).toThrow(text);
  });
});

describe('rejectCustomError', async () => {
  try {
    await rejectCustomError();
  } catch (error) {
    expect(error).toEqual(new MyAwesomeError());
  }
});
