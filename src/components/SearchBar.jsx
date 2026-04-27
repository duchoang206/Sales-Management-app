import { Search, X } from 'lucide-react'

/**
 * Thanh tìm kiếm sản phẩm
 */
const SearchBar = ({ value, onChange }) => {
  return (
    <div className="search-bar">
      <Search size={18} className="search-icon" />
      <input
        type="text"
        className="search-input"
        placeholder="Tìm kiếm sản phẩm, vị trí kệ..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button className="search-clear" onClick={() => onChange('')} title="Xóa tìm kiếm">
          <X size={16} />
        </button>
      )}
    </div>
  )
}

export default SearchBar
