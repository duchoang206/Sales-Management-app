/**
 * Badge hiển thị trạng thái tồn kho
 */
const StockBadge = ({ stock, unit }) => {
  const getStatus = () => {
    if (stock === 0) return { label: 'Hết hàng', cls: 'stock-empty' }
    if (stock <= 5) return { label: `Sắp hết (${stock})`, cls: 'stock-low' }
    if (stock <= 15) return { label: `Còn ${stock} ${unit}`, cls: 'stock-medium' }
    return { label: `Còn ${stock} ${unit}`, cls: 'stock-ok' }
  }

  const { label, cls } = getStatus()

  return <span className={`stock-badge ${cls}`}>{label}</span>
}

export default StockBadge
