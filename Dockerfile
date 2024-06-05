# Menggunakan image resmi Nginx sebagai parent image
FROM nginx:latest

# Salin file HTML dan direktori lainnya ke dalam direktori kerja Nginx
COPY /frontend-absekol/front-crud1/. /usr/share/nginx/html

# Expose port yang digunakan oleh Nginx
EXPOSE 80

# Perintah default untuk menjalankan Nginx
CMD ["nginx", "-g", "daemon off;"]
