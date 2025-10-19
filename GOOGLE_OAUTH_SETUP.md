# Google OAuth Setup Guide

## 🔧 Cấu hình Google Cloud Console

### 1. Authorized JavaScript Origins
```
https://angiday-two.vercel.app
http://localhost:5173
http://localhost:3000
http://127.0.0.1:5173
```

### 2. Authorized Redirect URIs
```
https://angiday-two.vercel.app
https://angiday-two.vercel.app/auth
https://angiday-two.vercel.app/auth?view=login
http://localhost:5173
http://localhost:3000
```

## 🔧 Cấu hình Vercel Environment Variables

### Environment Variables cần thêm:
```
VITE_GOOGLE_CLIENT_ID=1042609021742-tflr2gbgb5c60aktv5r42pf23isocgg8.apps.googleusercontent.com
VITE_API_BASE_URL=https://angiday-production-c5c0.up.railway.app
```

### ⚠️ Lưu ý quan trọng:
- **Client ID phải khớp** giữa frontend và backend
- **Backend expect**: `1042609021742-tflr2gbgb5c60aktv5r42pf23isocgg8.apps.googleusercontent.com`
- **Không dùng**: `691877893987-6reciq92hak2439m1mchfona8gt1f6cn.apps.googleusercontent.com`

## 🚨 Troubleshooting

### Lỗi thường gặp:
1. **403 Forbidden**: Origin chưa được thêm vào Authorized JavaScript origins
2. **unregistered_origin**: Domain chưa được đăng ký
3. **invalid_client**: Client ID không đúng
4. **opt_out_or_no_session**: Người dùng từ chối hoặc không có session

### Debug steps:
1. Kiểm tra console logs
2. Kiểm tra environment variables
3. Kiểm tra Google Cloud Console settings
4. Chờ 5-10 phút sau khi thay đổi settings
