## sử dụng Node.js để tạo một chuỗi ngẫu nhiên làm SECRET_KEY. Mở terminal và chạy lệnh sau:
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"