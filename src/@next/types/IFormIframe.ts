export interface IFormIframe {
  /**
   * Hashed card data.
   */
  message?: string,
  /**
   * First four-digits number representing the card’s expiration year, and last representing the card’s expiration month.
   */
  expiry?: string,
}