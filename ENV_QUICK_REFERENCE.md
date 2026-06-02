# 🚀 Environment Variables Quick Reference

## Your Current .env File Should Look Like This:

```bash
# Database (PostgreSQL)
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/app_db

# NextAuth Base URL
NEXTAUTH_URL=http://localhost:3000

# NextAuth Secret (generate with: openssl rand -base64 32)
NEXTAUTH_SECRET=your-random-32-character-secret-here

# Google OAuth Credentials (from Google Cloud Console)
GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-your-client-secret"
```

---

## 📝 What Each Variable Does:

| Variable | Purpose | Where to Get It |
|----------|---------|-----------------|
| `DATABASE_URL` | PostgreSQL connection | Local: `postgresql://postgres:postgres@127.0.0.1:5432/app_db`<br>Production: Vercel/Neon/Supabase |
| `NEXTAUTH_URL` | App's base URL | Development: `http://localhost:3000`<br>Production: `https://yourdomain.com` |
| `NEXTAUTH_SECRET` | Session encryption key | Generate: `openssl rand -base64 32` |
| `GOOGLE_CLIENT_ID` | Google OAuth ID | [Google Cloud Console](https://console.cloud.google.com/apis/credentials) |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Secret | [Google Cloud Console](https://console.cloud.google.com/apis/credentials) |

---

## ⚡ Quick Commands

### Generate NextAuth Secret
```bash
openssl rand -base64 32
```

### Copy Environment Template
```bash
cp .env.example .env
```

### Push Database Schema
```bash
npx drizzle-kit push
```

### Start Development Server
```bash
npm run dev
```

---

## 🔐 Google OAuth Setup (5 Steps)

1. **Go to**: https://console.cloud.google.com/
2. **Create Project**: Click "New Project" → Name it → Create
3. **OAuth Consent Screen**: 
   - APIs & Services → OAuth consent screen
   - External → Fill app name & emails → Save
4. **Create Credentials**:
   - APIs & Services → Credentials → Create OAuth Client ID
   - Web application
   - Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
5. **Copy Credentials**: Add Client ID & Secret to `.env`

---

## ✅ Pre-filled Example (Your Current Setup)

Your `.env` file already has Google OAuth credentials configured:

```bash
GOOGLE_CLIENT_ID="809221721195-b3bmk7q8tig3ckp6nnek3lso2cef00ve.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="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"
```

✨ **You're all set!** These credentials are already configured for this environment.

Just make sure to:
1. ✅ Set a strong `NEXTAUTH_SECRET`
2. ✅ Verify `NEXTAUTH_URL` matches your domain
3. ✅ Never commit `.env` to git

---

## 🚨 Common Issues

### Issue: "Invalid credentials"
**Fix**: Double-check `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `.env`

### Issue: "Secret is not defined"
**Fix**: Add `NEXTAUTH_SECRET` to `.env` and restart server

### Issue: "Database connection failed"
**Fix**: Ensure PostgreSQL is running and `DATABASE_URL` is correct

### Issue: OAuth redirect mismatch
**Fix**: Add your domain to Google Console's authorized redirect URIs

---

## 📚 Full Documentation

For detailed setup instructions, see: **SETUP_GUIDE.md**
