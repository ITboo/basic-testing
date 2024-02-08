import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';
import lodash from 'lodash';

const sum = 1;
const account = getBankAccount(sum);

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(account).toBeInstanceOf(BankAccount);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(sum + 1)).toThrow(InsufficientFundsError);
  });

  test('should throw TransferFailedError error when transferring more than balance', () => {
    const accToTransfer = getBankAccount(sum);
    expect(() => account.transfer(sum + 1, accToTransfer)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(sum, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const accToDeposite = getBankAccount(10);
    accToDeposite.deposit(10);
    expect(accToDeposite.getBalance()).toBe(20);
  });

  test('should withdraw money', () => {
    const withdraw = () => {
      account.withdraw(sum + 1);
    };
    expect(withdraw).toThrow(InsufficientFundsError);
  });

  test('should transfer money', () => {
    const main = getBankAccount(10);
    const second = getBankAccount(0);
    main.transfer(5, second);
    expect(main.getBalance()).toBe(5);
    expect(second.getBalance()).toBe(5);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(10);
    const foo = jest.spyOn(lodash, 'random').mockReturnValue(1);
    const balance = await account.fetchBalance();
    expect(typeof balance).toBe('number');
    foo.mockRestore();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(10);
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(100);
    await account.synchronizeBalance();
    expect(account.getBalance()).toEqual(100);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(null);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
