# obaki-get-cache-data

[![npm version](https://badge.fury.io/js/obaki-local-storage.svg)](https://www.npmjs.com/package/obaki-local-storage)

`obaki-local-storage` is a lightweight utility for efficient data caching and retrieval, designed to optimize performance by minimizing unnecessary network requests.

## Installation

Install the package via npm:

```bash
npm install obaki-local-storage
```
## Usage

`getCacheData`
```typescript
import { getCacheData } from 'obaki-local-storage';

// Define your fetch data function
const fetchDataFunction = async () => {
  // Implement your data fetching logic here
  // ...
  return /* fresh data */;
};

// Example usage for getCacheData
const cachedData = await getCacheData('my-cache-key', fetchDataFunction);

console.log('Cached Data:', cachedData);

```

`getEncryptedCacheData`
```typescript
import { getEncryptedCacheData } from 'obaki-local-storage';

// Define your fetch data function
const fetchDataFunction = async () => {
  // Implement your data fetching logic here
  // ...
  return /* fresh data */;
};

// Set your encryption key
const encryptionKey = 'your-secret-key';

// Example usage for getEncryptedCacheData
const encryptedData = await getEncryptedCacheData('my-encrypted-cache-key', fetchDataFunction, encryptionKey);

console.log('Encrypted Data:', encryptedData);

```

`getEncryptedData`
```typescript
import { getEncryptedData } from 'obaki-local-storage';

const key = 'myEncryptedDataKey';
const encryptionKey = 'SuperSecretKey';

// Retrieve and decrypt data
const decryptedData = await getEncryptedData(key, encryptionKey);

console.log('Decrypted Data:', decryptedData);


```

`setEncryptedData`
```typescript
import { setEncryptedData } from 'obaki-local-storage';

const key = 'myEncryptedDataKey';
const encryptionKey = 'SuperSecretKey';
const dataToStore = ['confidential', 'information'];

// Encrypt and store data
await setEncryptedData(key, dataToStore, encryptionKey);

console.log('Data encrypted and stored successfully.');


```




