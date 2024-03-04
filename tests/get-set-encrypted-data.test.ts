import { getEncryptedData, setEncryptedData } from '../src';
import 'jest-localstorage-mock';
import CryptoJS from 'crypto-js';

describe('getEncryptedData and setEncryptedData functions', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return decrypted data using getEncryptedData', async () => {
    const originalData = ['testData'];
    const encryptionKey = 'SuperSecureKey';

    // Set up localStorage with encrypted data
    localStorage.setItem('testKey', encryptData(originalData, encryptionKey));

    // Call the getEncryptedData function
    const result = await getEncryptedData('testKey', encryptionKey);

    // Assert the result
    expect(result).toEqual(originalData);
  });

  it('should set encrypted data using setEncryptedData', () => {
    const newData = ['newTestData'];
    const encryptionKey = 'SuperSecureKey';

    // Call the setEncryptedData function
    setEncryptedData('testKey', newData, encryptionKey);

    // Retrieve the stored data from localStorage
    const storedData = localStorage.getItem('testKey');

    // Decrypt the stored data for comparison
    const decryptedData = decryptData(storedData as string, encryptionKey) as string[];

    // Assert the result
    expect(decryptedData).toEqual(newData);
  });
});

// Mock encryptData and decryptData functions for testing
function encryptData<T>(data: T[], encryptionKey: string): string {
  const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), encryptionKey).toString();
  return ciphertext;
}

function decryptData<T>(ciphertext: string, encryptionKey: string): T[] {
  const bytes = CryptoJS.AES.decrypt(ciphertext, encryptionKey);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
}
