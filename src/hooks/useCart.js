import { useState, useCallback, useMemo } from 'react'

/**
 * Hook quản lý giỏ hàng
 */
export const useCart = () => {
  const [cartItems, setCartItems] = useState([])

  /**
   * Thêm sản phẩm vào giỏ
   * @param {import('../types').Product} product
   * @param {number} quantity
   */
  const addToCart = useCallback((product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id)
      if (existing) {
        const newQty = existing.quantity + quantity
        // Không vượt quá tồn kho
        if (newQty > product.stock) return prev
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: newQty } : item
        )
      }
      if (quantity > product.stock) return prev
      return [...prev, { product, quantity }]
    })
  }, [])

  /**
   * Cập nhật số lượng trong giỏ
   * @param {string} productId
   * @param {number} quantity
   */
  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: Math.min(quantity, item.product.stock) }
          : item
      )
    )
  }, [])

  /**
   * Xóa sản phẩm khỏi giỏ
   * @param {string} productId
   */
  const removeFromCart = useCallback((productId) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId))
  }, [])

  /**
   * Xóa toàn bộ giỏ hàng
   */
  const clearCart = useCallback(() => {
    setCartItems([])
  }, [])

  /**
   * Tổng tiền giỏ hàng
   */
  const total = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [cartItems]
  )

  /**
   * Tổng số lượng sản phẩm trong giỏ
   */
  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  )

  return {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    total,
    totalItems,
  }
}
