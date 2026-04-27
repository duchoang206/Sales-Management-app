const KEYS = {
  PRODUCTS: 'dien_nuoc_products',
  TRANSACTIONS: 'dien_nuoc_transactions',
}

/**
 * Lưu danh sách sản phẩm (tồn kho) vào localStorage
 * @param {import('../types').Product[]} products
 */
export const saveProducts = (products) => {
  try {
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products))
  } catch (e) {
    console.error('Lỗi lưu sản phẩm:', e)
  }
}

/**
 * Tải danh sách sản phẩm từ localStorage
 * @returns {import('../types').Product[]|null}
 */
export const loadProducts = () => {
  try {
    const raw = localStorage.getItem(KEYS.PRODUCTS)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

/**
 * Lưu lịch sử giao dịch
 * @param {import('../types').Transaction[]} transactions
 */
export const saveTransactions = (transactions) => {
  try {
    localStorage.setItem(KEYS.TRANSACTIONS, JSON.stringify(transactions))
  } catch (e) {
    console.error('Lỗi lưu giao dịch:', e)
  }
}

/**
 * Tải lịch sử giao dịch
 * @returns {import('../types').Transaction[]}
 */
export const loadTransactions = () => {
  try {
    const raw = localStorage.getItem(KEYS.TRANSACTIONS)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

/**
 * Xóa toàn bộ dữ liệu (reset)
 */
export const clearAll = () => {
  localStorage.removeItem(KEYS.PRODUCTS)
  localStorage.removeItem(KEYS.TRANSACTIONS)
}
