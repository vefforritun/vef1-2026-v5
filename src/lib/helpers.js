/**
 * Sleeps for given number of seconds.
 * @param {number} seconds
 */
export async function sleep(seconds) {
  console.warn('sleeping for', seconds, 'seconds');
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

/**
 * Throws an error with given message.
 * @param {string} message
 */
export function error(message) {
  console.error('Throwing error:', message);
  throw new Error(message);
}

