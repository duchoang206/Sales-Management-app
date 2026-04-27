import { Trash2, Plus, Minus, ShoppingBag, X, CheckCircle } from 'lucide-react'
import { formatCurrency } from '../utils/formatters'

/**
 * Panel giỏ hàng bên phải
 */
const CartPanel = ({
  cartItems,
  total,
  totalItems,
  onUpdateQuantity,
  onRemove,
  onClear,
  onCheckout,
}) => {
  const isEmpty = cartItems.length === 0

  return (
    <aside className="cart-panel">
      <div className="cart-header">
        <div className="cart-title">
          <ShoppingBag size={20} />
          <span>Giỏ Hàng</span>
        </div>
        {!isEmpty && (
          <span className="cart-badge">{totalItems}</span>
        )}
      </div>

      {/* Danh sách sản phẩm */}
      <div className="cart-body">
        {isEmpty ? (
          <div className="cart-empty">
            <ShoppingBag size={48} opacity={0.2} />
            <p>Chưa có sản phẩm</p>
            <span>Chọn sản phẩm từ danh sách</span>
          </div>
        ) : (
          <ul className="cart-list">
            {cartItems.map((item) => (
              <li key={item.product.id} className="cart-item">
                <div className="cart-item-name" title={item.product.name}>
                  {item.product.name}
                </div>
                <div className="cart-item-unit">
                  {formatCurrency(item.product.price)} / {item.product.unit}
                </div>

                <div className="cart-item-row">
                  <div className="qty-control">
                    <button
                      className="qty-btn"
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                    >
                      <Minus size={12} />
                    </button>
                    <input
                      className="qty-input"
                      type="number"
                      min={1}
                      max={item.product.stock}
                      value={item.quantity}
                      onChange={(e) =>
                        onUpdateQuantity(item.product.id, parseInt(e.target.value) || 1)
                      }
                    />
                    <button
                      className="qty-btn"
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                      disabled={item.quantity >= item.product.stock}
                    >
                      <Plus size={12} />
                    </button>
                  </div>

                  <span className="cart-item-subtotal">
                    {formatCurrency(item.product.price * item.quantity)}
                  </span>

                  <button
                    className="cart-item-remove"
                    onClick={() => onRemove(item.product.id)}
                    title="Xóa"
                  >
                    <X size={14} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer tổng tiền */}
      {!isEmpty && (
        <div className="cart-footer">
          <div className="cart-summary">
            <div className="summary-row">
              <span>Số mặt hàng:</span>
              <span>{cartItems.length} loại</span>
            </div>
            <div className="summary-row">
              <span>Số lượng:</span>
              <span>{totalItems} sản phẩm</span>
            </div>
            <div className="summary-total">
              <span>Tổng cộng:</span>
              <span className="total-amount">{formatCurrency(total)}</span>
            </div>
          </div>

          <div className="cart-actions">
            <button className="btn-clear" onClick={onClear}>
              <Trash2 size={15} />
              Xóa giỏ
            </button>
            <button className="btn-checkout" onClick={onCheckout}>
              <CheckCircle size={15} />
              Hoàn tất
            </button>
          </div>
        </div>
      )}
    </aside>
  )
}

export default CartPanel
