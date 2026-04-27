import { ShoppingCart, MapPin, Package } from 'lucide-react'
import StockBadge from './StockBadge'
import { formatCurrency, getCategoryLabel, getCategoryColor } from '../utils/formatters'

/**
 * Card hiển thị thông tin sản phẩm
 */
const ProductCard = ({ product, onAddToCart }) => {
  const isOutOfStock = product.stock === 0
  const catColor = getCategoryColor(product.category)

  const handleAdd = () => {
    if (!isOutOfStock) onAddToCart(product, 1)
  }

  return (
    <div className={`product-card ${isOutOfStock ? 'out-of-stock' : ''}`}>
      {/* Ảnh hoặc placeholder */}
      <div className="product-img-wrap">
        {product.image ? (
          <img
            src={`/src/assets/products/${product.image}`}
            alt={product.name}
            className="product-img"
            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
          />
        ) : null}
        <div
          className="product-img-placeholder"
          style={{ display: product.image ? 'none' : 'flex', background: `${catColor}18` }}
        >
          <Package size={36} color={catColor} opacity={0.7} />
        </div>

        {/* Badge danh mục */}
        <span
          className="cat-badge"
          style={{ background: catColor }}
        >
          {getCategoryLabel(product.category)}
        </span>
      </div>

      {/* Thông tin */}
      <div className="product-info">
        <h3 className="product-name" title={product.name}>{product.name}</h3>
        <p className="product-desc">{product.description}</p>

        <div className="product-meta">
          <span className="meta-row">
            <MapPin size={13} />
            {product.location}
          </span>
        </div>

        <div className="product-footer">
          <div>
            <div className="product-price">{formatCurrency(product.price)}</div>
            <div className="product-unit">/ {product.unit}</div>
            <StockBadge stock={product.stock} unit={product.unit} />
          </div>

          <button
            className={`btn-add ${isOutOfStock ? 'disabled' : ''}`}
            onClick={handleAdd}
            disabled={isOutOfStock}
            title={isOutOfStock ? 'Hết hàng' : 'Thêm vào giỏ'}
          >
            <ShoppingCart size={16} />
            {isOutOfStock ? 'Hết' : 'Thêm'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
