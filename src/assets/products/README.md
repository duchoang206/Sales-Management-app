# Thư Mục Ảnh Sản Phẩm

Đặt ảnh sản phẩm vào đây theo định dạng:

```
src/assets/products/
├── dien-001.jpg      ← ổ cắm điện đa năng
├── dien-002.jpg      ← công tắc đơn
├── nuoc-001.jpg      ← van bi inox
└── ...
```

## Tên file = ID sản phẩm

Mở `src/data/products.js` và cập nhật trường `image`:

```js
{
  id: 'dien-001',
  image: 'dien-001.jpg',   // ← thêm tên file ảnh vào đây
  ...
}
```

## Định dạng hỗ trợ
- `.jpg` / `.jpeg`
- `.png`
- `.webp`

## Kích thước khuyến nghị
- Tỷ lệ: `4:3` hoặc `1:1`
- Kích thước tối thiểu: `400 x 300px`
- Dung lượng: dưới `500KB` mỗi ảnh
