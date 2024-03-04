import { getCacheData } from '../src'; 
import 'jest-localstorage-mock';

describe('getCacheData function', () => {
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

    // Call the getCacheData function
    const result = await getCacheData('testKey', fetchDataIfNeeded, 1);

    // Assert the result
    expect(result).toEqual(mockData);
    expect(fetchDataIfNeeded).not.toHaveBeenCalled(); 
  });

  it('should fetch and return new data if cached data is stale', async () => {
    const staleData = ['staleData'];
    const staleTimestamp = new Date().getTime() - 2 * 24 * 60 * 60 * 1000; // 2 days ago

    // Set up localStorage with stale mock data
    localStorage.setItem('testKey', JSON.stringify({ data: staleData, timestamp: staleTimestamp }));

    // Mock fetchDataIfNeeded to return fresh data
    const fetchDataIfNeeded = jest.fn(async () => ['freshData']);

    // Call the getCacheData function
    const result = await getCacheData('testKey', fetchDataIfNeeded, 1);

    // Assert the result
    expect(result).toEqual(['freshData']);
    expect(fetchDataIfNeeded).toHaveBeenCalled(); 
  });
});
