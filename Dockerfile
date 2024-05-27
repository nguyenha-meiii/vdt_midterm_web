# Giai đoạn 1: Xây dựng ứng dụng frontend bằng Node.js
FROM node:alpine AS build

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép các tệp package.json và package-lock.json vào thư mục làm việc
COPY package*.json ./

# Cài đặt các phụ thuộc
RUN npm install

# Sao chép toàn bộ mã nguồn vào thư mục làm việc
COPY . .

# Xây dựng ứng dụng
RUN npm run build

# Giai đoạn 2: Sử dụng Nginx để phục vụ ứng dụng
FROM nginx:1.22.0-alpine

# Sao chép tệp cấu hình Nginx tùy chỉnh vào thư mục cấu hình của Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Sao chép các tệp build từ giai đoạn build sang thư mục phục vụ của Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Mở cổng 80 để Nginx có thể phục vụ các yêu cầu HTTP
EXPOSE 80

# Khởi động Nginx
CMD ["nginx", "-g", "daemon off;"]

