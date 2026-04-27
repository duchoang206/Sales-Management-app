import { CATEGORIES } from '../data/products'

/**
 * Bộ lọc danh mục sản phẩm
 */
const CategoryFilter = ({ selected, onChange, productCounts }) => {
  return (
    <div className="category-filter">
      {CATEGORIES.map((cat) => {
        const count = cat.id === 'all'
          ? Object.values(productCounts).reduce((a, b) => a + b, 0)
          : (productCounts[cat.id] || 0)

        return (
          <button
            key={cat.id}
            className={`cat-btn ${selected === cat.id ? 'active' : ''}`}
            onClick={() => onChange(cat.id)}
          >
            <span className="cat-icon">{cat.icon}</span>
            <span className="cat-label">{cat.label}</span>
            <span className="cat-count">{count}</span>
          </button>
        )
      })}
    </div>
  )
}

export default CategoryFilter
