/**
 * Format số tiền sang VNĐ
 * @param {number} amount
 * @returns {string}
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
  }).format(amount)
}

/**
 * Format ngày giờ tiếng Việt
 * @param {Date|string} date
 * @returns {string}
 */
export const formatDateTime = (date) => {
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(new Date(date))
}

/**
 * Format ngày ngắn gọn
 * @param {Date|string} date
 * @returns {string}
 */
export const formatDate = (date) => {
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(date))
}

/**
 * Tạo ID giao dịch duy nhất
 * @returns {string}
 */
export const generateTransactionId = () => {
  const now = new Date()
  const pad = (n) => String(n).padStart(2, '0')
  const datePart = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}`
  const timePart = `${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`
  const rand = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `HD${datePart}-${timePart}-${rand}`
}

/**
 * Label danh mục
 * @param {string} category
 * @returns {string}
 */
export const getCategoryLabel = (category) => {
  const map = {
    dien: 'Đồ Điện',
    nuoc: 'Đồ Nước',
    'phu-kien': 'Phụ Kiện',
    'day-cap': 'Dây & Cáp',
  }
  return map[category] || category
}

/**
 * Màu badge danh mục
 * @param {string} category
 * @returns {string}
 */
export const getCategoryColor = (category) => {
  const map = {
    dien: '#f59e0b',
    nuoc: '#3b82f6',
    'phu-kien': '#8b5cf6',
    'day-cap': '#10b981',
  }
  return map[category] || '#6b7280'
}
