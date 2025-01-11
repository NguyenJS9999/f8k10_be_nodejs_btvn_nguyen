## Xây dựng các API request với yêu cầu sau:

### Thiết lập model Product và model Category

1. Tạo model `Product` với các trường sau:

   - `title`: String, required
   - `price`: Number, required
   - `categoryId`: ObjectId, ref: 'Category', required
   - `description`: String
   - `isHidden`: Boolean, default: false
   - `createdAt`: Date, default: Date.now
   - `updatedAt`: Date, default: Date.now
   - `deletedAt`: Date, default: null

2. Tạo model `Category` với các trường sau:

   - `title`: String, required
   - `description`: String
   - `products`: Array, ref: 'Product'
   - `isHidden`: Boolean, default: false
   - `createdAt`: Date, default: Date.now
   - `updatedAt`: Date, default: Date.now
   - `deletedAt`: Date, default: null

### Tạo API cho Category

1. Tạo API lấy danh sách tất cả các category

   - Method: GET
   - URL: `/api/categories`
   - Response: Danh sách các category
   - Status code: 200

2. Tạo API lấy chi tiết một category

   - Method: GET
   - URL: `/api/categories/:id`
   - Response: Chi tiết một category
   - Status code: 200

3. Tạo API tạo mới một category

   - Method: POST
   - URL: `/api/categories`
   - Request body: title, description
   - Response: Category vừa tạo
   - Status code: 201

4. Tạo API cập nhật một category

   - Method: PATCH   
   - URL: `/api/categories/:id`
   - Request body: title, description
   - Response: Category vừa cập nhật
   - Status code: 200

5. Tạo API xóa mềm một category

   - Method: PATCH
   - URL: `/api/categories/:id`
   - Response: Category vừa xóa
   - Status code: 200
   - Lưu ý: xoá mềm là hành vi cập nhật trường `deletedAt` của category thành thời gian hiện tại và `isHidden` thành `true` (trong thực tế chỉ cần trường `deletedAt` là đủ, nhưng để dễ quản lý dữ liệu, có thể thêm trường `isHidden`)

6. Tạo API xoá vĩnh viễn một category

   - Method: DELETE
   - URL: `/api/categories/:id`
   - Response: Category vừa xóa
   - Status code: 200
   - Lưu ý: việc xoá vĩnh việc sẽ xoá luôn category khỏi database

### Tạo API cho Product

1. Tạo API lấy danh sách tất cả các product

   - Method: GET
   - URL: `/api/products`
   - Response: Danh sách các product
   - Status code: 200
   - Lưu ý: Cần lấy được tên danh mục mà product đó thuộc về

2. Tạo API lấy chi tiết một product

   - Method: GET
   - URL: `/api/products/:id`
   - Response: Chi tiết một product
   - Status code: 200
   - Lưu ý: cần lấy được tên danh mục mà product đó thuộc về

3. Tạo API tạo mới một product

   - Method: POST
   - URL: `/api/products`
   - Request body: title, price, categoryId, description
   - Response: Product vừa tạo
   - Status code: 201
   - Lưu ý: categoryId không có trong req.body hoặc là chuỗi rỗng thì mặc định add vào category có id là id của một danh mục mặc định "Uncategorized", ngoài ra cập cập nhật lại products của category đó

4. Tạo API cập nhật một product

   - Method: PATCH
   - URL: `/api/products/:id`
   - Request body: title, price, categoryId, description
   - Response: Product vừa cập nhật
   - Status code: 200
   - Lưu ý: Khi cập nhật sản phẩm, nếu ảnh hưởng đến category thì cập nhật category đó

5. Tạo API xóa mềm một product

   - Method: PATCH
   - URL: `/api/products/:id`
   - Response: Product vừa xóa
   - Status code: 200
   - Lưu ý: xoá mềm là hành vi cập nhật trường `deletedAt` của product thành thời gian hiện tại và `isHidden` thành `true`

6. Tạo API xoá vĩnh viễn một product

   - Method: DELETE
   - URL: `/api/products/:id`
   - Response: Product vừa xóa
   - Status code: 200
   - Lưu ý: việc xoá vĩnh việc sẽ xoá luôn product khỏi database, ngoài ra cập nhật lại products của category đó
   - **Trong thực tế nghiệp vụ xoá vĩnh viễn là đưa item vào một mục đặc biệt và xử lý tự động xoá vĩnh viễn sau 30 ngày (Học viên có thể nghiên cứu tìm hiểu trước cron-job trong NodeJS để thực hiện những tác vụ tự động như vậy)**
