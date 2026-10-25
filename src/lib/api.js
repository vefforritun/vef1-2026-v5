import { sleep, error } from './helpers.js';

/** Hámarksfjöldi hráefna í svari frá API. */
const MAX_INGREDIENTS = 20;

/* TODO útfæra rest */
export class MealApi {
  /**
   * @param {string} baseUrl API base url.
   */
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async search(query) {
    /* TODO útfæra */
  }
}
