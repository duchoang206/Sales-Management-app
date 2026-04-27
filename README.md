# 🔧 Cửa Hàng Điện Nước - Phần Mềm Quản Lý Bán Hàng

Phần mềm quản lý bán hàng cho cửa hàng đồ điện nước nhỏ, được xây dựng bằng React + Vite.

## ✨ Tính Năng

- 🔍 **Tìm kiếm sản phẩm** — Tìm theo tên, loại, vị trí
- 📦 **Quản lý tồn kho** — Xem số lượng, vị trí kệ hàng
- 🛒 **Giỏ hàng & Bán hàng** — Thêm sản phẩm, tính tổng tiền
- 💰 **Hoàn tất đơn hàng** — Tự động trừ tồn kho
- ↩️ **Hoàn tác đơn hàng** — Khôi phục lại tồn kho nếu đổi ý
- 📋 **Lịch sử giao dịch** — Xem lại các đơn hàng đã bán
- 🖼️ **Ảnh sản phẩm** — Đặt ảnh vào `src/assets/products/`

## 🚀 Cài Đặt & Chạy

```bash
# Cài dependencies
npm install

# Chạy development server
npm run dev

# Build production
npm run build
```

## 📁 Cấu Trúc Thư Mục

```
dien-nuoc-store/
├── src/
│   ├── assets/
│   │   └── products/        ← Đặt ảnh sản phẩm tại đây
│   ├── components/          ← UI components tái sử dụng
│   │   ├── CartPanel.jsx
│   │   ├── ProductCard.jsx
│   │   ├── SearchBar.jsx
│   │   ├── CategoryFilter.jsx
│   │   ├── TransactionHistory.jsx
│   │   └── StockBadge.jsx
│   ├── pages/
│   │   └── StorePage.jsx    ← Trang chính
│   ├── hooks/
│   │   ├── useInventory.js  ← Logic quản lý tồn kho
│   │   └── useCart.js       ← Logic giỏ hàng
│   ├── utils/
│   │   ├── formatters.js    ← Format tiền tệ, ngày
│   │   └── storage.js       ← LocalStorage helpers
│   ├── data/
│   │   └── products.js      ← Dữ liệu sản phẩm mẫu
│   ├── types/
│   │   └── index.js         ← JSDoc type definitions
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

## 🖼️ Thêm Ảnh Sản Phẩm

1. Copy ảnh vào thư mục `src/assets/products/`
2. Đặt tên ảnh theo `id` sản phẩm (VD: `may-bom-nuoc.jpg`)
3. Cập nhật trường `image` trong `src/data/products.js`

## 📝 Thêm / Sửa Sản Phẩm

Mở file `src/data/products.js` và thêm sản phẩm theo mẫu:

```js
{
  id: 'sp-001',
  name: 'Tên sản phẩm',
  category: 'dien',          // 'dien' | 'nuoc' | 'phu-kien' | 'day-cap'
  price: 150000,             // Giá (VNĐ)
  stock: 20,                 // Số lượng tồn kho
  unit: 'cái',               // Đơn vị tính
  location: 'Kệ A1',        // Vị trí trong kho
  image: null,               // Tên file ảnh hoặc null
  description: 'Mô tả ngắn',
}
```
