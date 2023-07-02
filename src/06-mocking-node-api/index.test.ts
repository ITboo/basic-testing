import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import fs from 'fs';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    jest.spyOn(global, 'setTimeout');
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const timeout = 1000;
    const callback = jest.fn();

    doStuffByTimeout(callback, timeout);

    expect(setTimeout).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    const timeout = 500;
    const callback = jest.fn();

    doStuffByTimeout(callback, timeout);
    jest.advanceTimersByTime(timeout);
    expect(setTimeout).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    jest.spyOn(global, 'setTimeout');
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const timeout = 500;
    const callback = jest.fn();

    doStuffByInterval(callback, timeout);

    expect(setInterval).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, 100);

    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(1000);

    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(10);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const join = jest.spyOn(path, 'join');
    await readFileAsynchronously('file.txt');

    expect(join).toHaveBeenCalled();
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const result = await readFileAsynchronously('file.txt');
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const fileContent = 'test';
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs.promises, 'readFile').mockResolvedValue(fileContent);

    const result = await readFileAsynchronously('file.txt');
    expect(result).toBe(fileContent);
  });
});
