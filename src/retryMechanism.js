/**
 * Returns a promise that resolves after the specified delay.
 * @param {number} ms - Delay in milliseconds.
 * @returns {Promise<void>}
 */

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/**
 * Retries an async operation using exponential backoff.
 * @param {Function} fetcher - Function that returns a Promise.
 * @param {number} retries - Number of retry attempts.
 * @param {number} initialDelay - Starting delay in milliseconds.
 * @returns {Promise<any>}
 */

async function fetchWithAutoRetry(
  fetcher,
  retries,
  initialDelay = 100,
) {
  let attempt = 0;
  while (attempt <= retries) {
    try {
      return await fetcher();
    } catch (error) {
      // No retries left

      if (attempt === retries) {
        throw error;
      }
      // Exponential backoff:
      // 100ms, 200ms, 400ms, 800ms, ...
      const delay = initialDelay * Math.pow(2, attempt);
      console.log(`Attempt ${attempt + 1} failed. Retrying in ${delay}ms...`);
      await sleep(delay);
      attempt++;
    }
  }
}

