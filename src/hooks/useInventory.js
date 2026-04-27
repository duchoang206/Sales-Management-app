import { useState, useCallback } from 'react'
import { INITIAL_PRODUCTS } from '../data/products'
import { saveProducts, loadProducts } from '../utils/storage'

/**
 * Hook quản lý tồn kho sản phẩm
 */
export const useInventory = () => {
  const [products, setProducts] = useState(() => {
    const saved = loadProducts()
    return saved || INITIAL_PRODUCTS
  })

  /**
   * Trừ tồn kho khi hoàn tất đơn hàng
   * @param {import('../types').CartItem[]} cartItems
   * @returns {{ success: boolean, errors: string[] }}
   */
  const deductStock = useCallback((cartItems) => {
    const errors = []

    // Kiểm tra trước khi trừ
    for (const item of cartItems) {
      const product = products.find((p) => p.id === item.product.id)
      if (!product) {
        errors.push(`Không tìm thấy sản phẩm: ${item.product.name}`)
      } else if (product.stock < item.quantity) {
        errors.push(`"${product.name}" chỉ còn ${product.stock} ${product.unit}`)
      }
    }

    if (errors.length > 0) return { success: false, errors }

    setProducts((prev) => {
      const updated = prev.map((p) => {
        const cartItem = cartItems.find((ci) => ci.product.id === p.id)
        if (cartItem) {
          return { ...p, stock: p.stock - cartItem.quantity }
        }
        return p
      })
      saveProducts(updated)
      return updated
    })

    return { success: true, errors: [] }
  }, [products])

  /**
   * Hoàn tác: cộng lại tồn kho (khi hủy đơn hàng)
   * @param {import('../types').CartItem[]} cartItems
   */
  const restoreStock = useCallback((cartItems) => {
    setProducts((prev) => {
      const updated = prev.map((p) => {
        const cartItem = cartItems.find((ci) => ci.product.id === p.id)
        if (cartItem) {
          return { ...p, stock: p.stock + cartItem.quantity }
        }
        return p
      })
      saveProducts(updated)
      return updated
    })
  }, [])

  /**
   * Cập nhật số lượng tồn kho thủ công
   * @param {string} productId
   * @param {number} newStock
   */
  const updateStock = useCallback((productId, newStock) => {
    setProducts((prev) => {
      const updated = prev.map((p) =>
        p.id === productId ? { ...p, stock: Math.max(0, newStock) } : p
      )
      saveProducts(updated)
      return updated
    })
  }, [])

  /**
   * Reset toàn bộ về dữ liệu ban đầu
   */
  const resetToDefault = useCallback(() => {
    setProducts(INITIAL_PRODUCTS)
    saveProducts(INITIAL_PRODUCTS)
  }, [])

  return {
    products,
    deductStock,
    restoreStock,
    updateStock,
    resetToDefault,
  }
}
