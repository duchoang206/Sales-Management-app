import { RotateCcw, ChevronDown, ChevronUp, Receipt, Trash } from 'lucide-react'
import { useState } from 'react'
import { formatCurrency, formatDateTime } from '../utils/formatters'

/**
 * Lịch sử giao dịch + nút hoàn tác
 */
const TransactionHistory = ({ transactions, onCancel, onClearHistory }) => {
  const [expandedId, setExpandedId] = useState(null)

  const toggle = (id) => setExpandedId(expandedId === id ? null : id)

  if (transactions.length === 0) {
    return (
      <div className="history-empty">
        <Receipt size={40} opacity={0.2} />
        <p>Chưa có giao dịch nào</p>
      </div>
    )
  }

  return (
    <div className="history-list">
      <div className="history-header-row">
        <span className="history-count">{transactions.length} giao dịch</span>
        <button className="btn-clear-history" onClick={onClearHistory} title="Xóa lịch sử">
          <Trash size={14} /> Xóa lịch sử
        </button>
      </div>

      {[...transactions].reverse().map((tx) => (
        <div key={tx.id} className={`tx-card status-${tx.status}`}>
          <div className="tx-header" onClick={() => toggle(tx.id)}>
            <div className="tx-left">
              <span className={`tx-status-dot ${tx.status}`} />
              <div>
                <div className="tx-id">{tx.id}</div>
                <div className="tx-date">{formatDateTime(tx.date)}</div>
              </div>
            </div>
            <div className="tx-right">
              <span className="tx-total">{formatCurrency(tx.total)}</span>
              <span className={`tx-status-label ${tx.status}`}>
                {tx.status === 'completed' ? 'Hoàn tất' : 'Đã hủy'}
              </span>
              {expandedId === tx.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
          </div>

          {expandedId === tx.id && (
            <div className="tx-detail">
              <table className="tx-table">
                <thead>
                  <tr>
                    <th>Sản phẩm</th>
                    <th>SL</th>
                    <th>Đơn giá</th>
                    <th>Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {tx.items.map((item) => (
                    <tr key={item.product.id}>
                      <td>{item.product.name}</td>
                      <td>{item.quantity} {item.product.unit}</td>
                      <td>{formatCurrency(item.product.price)}</td>
                      <td>{formatCurrency(item.product.price * item.quantity)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3}><strong>Tổng cộng</strong></td>
                    <td><strong>{formatCurrency(tx.total)}</strong></td>
                  </tr>
                </tfoot>
              </table>

              {tx.status === 'completed' && (
                <button
                  className="btn-undo"
                  onClick={() => onCancel(tx)}
                  title="Hoàn tác đơn hàng này (cộng lại tồn kho)"
                >
                  <RotateCcw size={14} />
                  Hoàn tác — Cộng lại kho
                </button>
              )}
              {tx.status === 'cancelled' && (
                <p className="tx-cancelled-note">⚠️ Đơn hàng đã hủy — tồn kho đã được hoàn lại</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default TransactionHistory
