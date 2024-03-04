import { getEncryptedCacheData } from '../src';
import 'jest-localstorage-mock';
import CryptoJS from 'crypto-js';

describe('getEncryptedCacheData function', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return cached data if not stale', async () => {
    const mockData = ['cachedData'];
    const mockTimestamp = new Date().getTime();

    // Set up localStorage with mock data
    localStorage.setItem('testKey', JSON.stringify({ data: mockData, timestamp: mockTimestamp }));

    // Mock fetchDataIfNeeded to avoid actual network requests
    const fetchDataIfNeeded = jest.fn(async () => ['freshData']);

    // Mock decryptData to avoid actual decryption
    jest.spyOn(CryptoJS.AES, 'decrypt').mockReturnValueOnce(CryptoJS.enc.Utf8.parse(JSON.stringify(mockData)));

    // Call the getEncryptedCacheData function
    const result = await getEncryptedCacheData('testKey', fetchDataIfNeeded, 'SuperSecureKey', 1);

    // Assert the result
    expect(result).toEqual(mockData);
    expect(fetchDataIfNeeded).not.toHaveBeenCalled();
  });

  it('should fetch and return new data if cached data is stale', async () => {
    const staleData = ['staleData'];
    const staleTimestamp = new Date().getTime() - 2 * 24 * 60 * 60 * 1000; // 2 days ago

    // Set up localStorage with stale mock data
    localStorage.setItem('testKey', JSON.stringify({ data: encryptData(staleData, 'SuperSecureKey'), timestamp: staleTimestamp }));

    // Mock fetchDataIfNeeded to return fresh data
    const fetchDataIfNeeded = jest.fn(async () => ['freshData']);

    // Mock decryptData to avoid actual decryption
    jest.spyOn(CryptoJS.AES, 'decrypt').mockReturnValueOnce(CryptoJS.enc.Utf8.parse(JSON.stringify(staleData)));

    // Call the getEncryptedCacheData function
    const result = await getEncryptedCacheData('testKey', fetchDataIfNeeded, 'SuperSecureKey', 1);

    // Assert the result
    expect(result).toEqual(['freshData']);
    expect(fetchDataIfNeeded).toHaveBeenCalled();
  });
});

// Mock encryptData function for testing
function encryptData<T>(data: T[], encryptionKey: string): string {
  const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), encryptionKey).toString();
  return ciphertext;
}

