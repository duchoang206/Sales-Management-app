import { useState, useMemo, useCallback } from 'react'
import { Zap, History, Store, Bell } from 'lucide-react'

import SearchBar from '../components/SearchBar'
import CategoryFilter from '../components/CategoryFilter'
import ProductCard from '../components/ProductCard'
import CartPanel from '../components/CartPanel'
import TransactionHistory from '../components/TransactionHistory'
import CheckoutModal from '../components/CheckoutModal'

import { useInventory } from '../hooks/useInventory'
import { useCart } from '../hooks/useCart'
import { generateTransactionId } from '../utils/formatters'
import { saveTransactions, loadTransactions } from '../utils/storage'

const TABS = [
  { id: 'store', label: 'Bán Hàng', icon: Store },
  { id: 'history', label: 'Lịch Sử', icon: History },
]

const StorePage = () => {
  const { products, deductStock, restoreStock } = useInventory()
  const { cartItems, addToCart, updateQuantity, removeFromCart, clearCart, total, totalItems } = useCart()

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [activeTab, setActiveTab] = useState('store')
  const [showCheckout, setShowCheckout] = useState(false)
  const [transactions, setTransactions] = useState(() => loadTransactions())
  const [toast, setToast] = useState(null)

  // ---- Toast notification ----
  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }, [])

  // ---- Lọc sản phẩm ----
  const filteredProducts = useMemo(() => {
    const q = search.toLowerCase().trim()
    return products.filter((p) => {
      const matchCat = category === 'all' || p.category === category
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      return matchCat && matchSearch
    })
  }, [products, search, category])

  // ---- Đếm sản phẩm theo danh mục ----
  const productCounts = useMemo(() => {
    const counts = {}
    products.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1
    })
    return counts
  }, [products])

  // ---- Số lượng cảnh báo tồn kho thấp ----
  const lowStockCount = useMemo(
    () => products.filter((p) => p.stock > 0 && p.stock <= 5).length,
    [products]
  )

  // ---- Hoàn tất đơn hàng ----
  const handleCheckoutConfirm = useCallback(() => {
    const result = deductStock(cartItems)
    if (!result.success) {
      showToast('Lỗi: ' + result.errors.join(', '), 'error')
      return
    }

    const newTx = {
      id: generateTransactionId(),
      items: cartItems.map((item) => ({ ...item })),
      total,
      date: new Date().toISOString(),
      status: 'completed',
    }

    const updated = [...transactions, newTx]
    setTransactions(updated)
    saveTransactions(updated)
    clearCart()
    setShowCheckout(false)
    showToast(`✅ Hoàn tất! Đã bán ${cartItems.length} loại hàng — ${newTx.id}`)
  }, [cartItems, total, transactions, deductStock, clearCart, showToast])

  // ---- Hoàn tác đơn hàng ----
  const handleCancelTransaction = useCallback((tx) => {
    restoreStock(tx.items)
    const updated = transactions.map((t) =>
      t.id === tx.id ? { ...t, status: 'cancelled' } : t
    )
    setTransactions(updated)
    saveTransactions(updated)
    showToast(`↩️ Đã hoàn tác ${tx.id} — tồn kho đã được cộng lại`, 'info')
  }, [transactions, restoreStock, showToast])

  // ---- Xóa lịch sử ----
  const handleClearHistory = useCallback(() => {
    if (!window.confirm('Xóa toàn bộ lịch sử giao dịch?')) return
    setTransactions([])
    saveTransactions([])
    showToast('🗑️ Đã xóa lịch sử giao dịch')
  }, [showToast])

  return (
    <div className="app-layout">
      {/* Toast */}
      {toast && (
        <div className={`toast toast-${toast.type}`}>{toast.message}</div>
      )}

      {/* Sidebar giỏ hàng */}
      <CartPanel
        cartItems={cartItems}
        total={total}
        totalItems={totalItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onClear={clearCart}
        onCheckout={() => setShowCheckout(true)}
      />

      {/* Nội dung chính */}
      <main className="main-content">
        {/* Topbar */}
        <header className="topbar">
          <div className="topbar-brand">
            <Zap size={22} className="brand-icon" />
            <div>
              <h1 className="brand-name">ĐIỆN NƯỚC AN PHÁT</h1>
              <p className="brand-sub">Quản lý bán hàng</p>
            </div>
          </div>

          <nav className="tab-nav">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                className={`tab-btn ${activeTab === id ? 'active' : ''}`}
                onClick={() => setActiveTab(id)}
              >
                <Icon size={16} />
                {label}
                {id === 'history' && transactions.length > 0 && (
                  <span className="tab-badge">{transactions.length}</span>
                )}
              </button>
            ))}
          </nav>

          {lowStockCount > 0 && (
            <div className="low-stock-alert">
              <Bell size={15} />
              {lowStockCount} mặt hàng sắp hết
            </div>
          )}
        </header>

        {/* Tab: Bán hàng */}
        {activeTab === 'store' && (
          <>
            <div className="toolbar">
              <SearchBar value={search} onChange={setSearch} />
              <CategoryFilter
                selected={category}
                onChange={setCategory}
                productCounts={productCounts}
              />
            </div>

            <div className="results-info">
              {search || category !== 'all' ? (
                <span>Tìm thấy <strong>{filteredProducts.length}</strong> sản phẩm</span>
              ) : (
                <span>Tất cả <strong>{products.length}</strong> sản phẩm</span>
              )}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="no-results">
                <p>😕 Không tìm thấy sản phẩm nào</p>
                <button onClick={() => { setSearch(''); setCategory('all') }}>Xóa bộ lọc</button>
              </div>
            ) : (
              <div className="product-grid">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={addToCart}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* Tab: Lịch sử */}
        {activeTab === 'history' && (
          <div className="history-section">
            <h2 className="section-title">
              <History size={18} /> Lịch Sử Giao Dịch
            </h2>
            <TransactionHistory
              transactions={transactions}
              onCancel={handleCancelTransaction}
              onClearHistory={handleClearHistory}
            />
          </div>
        )}
      </main>

      {/* Modal xác nhận */}
      {showCheckout && (
        <CheckoutModal
          cartItems={cartItems}
          total={total}
          onConfirm={handleCheckoutConfirm}
          onCancel={() => setShowCheckout(false)}
        />
      )}
    </div>
  )
}

export default StorePage
