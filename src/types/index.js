/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} name
 * @property {'dien'|'nuoc'|'phu-kien'|'day-cap'} category
 * @property {number} price
 * @property {number} stock
 * @property {string} unit
 * @property {string} location
 * @property {string|null} image
 * @property {string} description
 */

/**
 * @typedef {Object} CartItem
 * @property {Product} product
 * @property {number} quantity
 */

/**
 * @typedef {Object} Transaction
 * @property {string} id
 * @property {CartItem[]} items
 * @property {number} total
 * @property {Date} date
 * @property {'completed'|'cancelled'} status
 * @property {string} [note]
 */

export {}
