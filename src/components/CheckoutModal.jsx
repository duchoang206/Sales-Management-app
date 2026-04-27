import { CheckCircle, X } from 'lucide-react'
import { formatCurrency } from '../utils/formatters'

/**
 * Modal xác nhận thanh toán
 */
const CheckoutModal = ({ cartItems, total, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Xác Nhận Thanh Toán</h2>
          <button className="modal-close" onClick={onCancel}><X size={20} /></button>
        </div>

        <div className="modal-body">
          <table className="checkout-table">
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>SL</th>
                <th>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.product.id}>
                  <td>{item.product.name}</td>
                  <td>{item.quantity} {item.product.unit}</td>
                  <td>{formatCurrency(item.product.price * item.quantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="checkout-total">
            <span>Tổng thanh toán</span>
            <strong>{formatCurrency(total)}</strong>
          </div>

          <p className="checkout-note">
            ✅ Xác nhận sẽ tự động trừ số lượng hàng trong kho.
          </p>
        </div>

        <div className="modal-footer">
          <button className="btn-modal-cancel" onClick={onCancel}>
            <X size={16} /> Hủy
          </button>
          <button className="btn-modal-confirm" onClick={onConfirm}>
            <CheckCircle size={16} /> Xác nhận &amp; Thanh toán
          </button>
        </div>
      </div>
    </div>
  )
}

export default CheckoutModal
