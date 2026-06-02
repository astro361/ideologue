# IdeaLogue Environment Setup Guide

This guide explains how to obtain and configure all required environment variables for IdeaLogue.

## 📋 Required Environment Variables

### 1. DATABASE_URL

**What it is**: PostgreSQL database connection string

**Format**: 
```
postgresql://[username]:[password]@[host]:[port]/[database_name]
```

**Local Development**:
```bash
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/app_db
```

**Production Options**:
- **Vercel Postgres**: Automatically provided when you add Vercel Postgres to your project
- **Neon**: Get from https://neon.tech
- **Supabase**: Get from https://supabase.com
- **Railway**: Get from https://railway.app
- **Self-hosted**: Use your own PostgreSQL server

---

### 2. NEXTAUTH_URL

**What it is**: The canonical URL of your application

**Local Development**:
```bash
NEXTAUTH_URL=http://localhost:3000
```

**Production**:
```bash
NEXTAUTH_URL=https://yourdomain.com
```

⚠️ **Important**: This must match the actual URL where your app is deployed

---

### 3. NEXTAUTH_SECRET

**What it is**: A secret key used to encrypt session tokens and cookies

**How to generate**:

**Option 1 - Using OpenSSL** (recommended):
```bash
openssl rand -base64 32
```

**Option 2 - Using Node.js**:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Option 3 - Online Generator**:
Visit: https://generate-secret.vercel.app/32

**Example**:
```bash
NEXTAUTH_SECRET=jK8mN2pQ4rS6tU8vW0xY2zA4bC6dE8fG0hI2jK4mN6pQ8rS0tU2vW4xY6zA8bC0d
```

⚠️ **Critical**: 
- NEVER commit this to version control
- Use a different secret for production
- Keep it at least 32 characters long

---

### 4. GOOGLE_CLIENT_ID & GOOGLE_CLIENT_SECRET

**What they are**: OAuth credentials that allow users to sign in with Google

## 🔐 How to Get Google OAuth Credentials

### Step 1: Go to Google Cloud Console
Visit: https://console.cloud.google.com/

### Step 2: Create or Select a Project
1. Click the project dropdown at the top
2. Click **"New Project"**
3. Name it (e.g., "IdeaLogue")
4. Click **"Create"**

### Step 3: Enable Google+ API
1. Go to **"APIs & Services" → "Library"**
2. Search for **"Google+ API"**
3. Click on it and press **"Enable"**

### Step 4: Configure OAuth Consent Screen
1. Go to **"APIs & Services" → "OAuth consent screen"**
2. Select **"External"** (for public apps) or **"Internal"** (for organization-only)
3. Click **"Create"**
4. Fill in the required fields:
   - **App name**: IdeaLogue
   - **User support email**: Your email
   - **Developer contact**: Your email
5. Click **"Save and Continue"**
6. **Scopes**: Click "Add or Remove Scopes"
   - Add: `userinfo.email`
   - Add: `userinfo.profile`
7. Click **"Save and Continue"**
8. **Test users** (if External): Add your email for testing
9. Click **"Save and Continue"**

### Step 5: Create OAuth Credentials
1. Go to **"APIs & Services" → "Credentials"**
2. Click **"+ Create Credentials"**
3. Select **"OAuth client ID"**
4. Application type: **"Web application"**
5. Name: **"IdeaLogue Web Client"**
6. **Authorized JavaScript origins**:
   - Development: `http://localhost:3000`
   - Production: `https://yourdomain.com`
7. **Authorized redirect URIs**:
   - Development: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://yourdomain.com/api/auth/callback/google`
8. Click **"Create"**

### Step 6: Copy Your Credentials
A modal will appear with:
- **Client ID**: Starts with `xxxxxx.apps.googleusercontent.com`
- **Client Secret**: Starts with `GOCSPX-xxxxx`

Copy these to your `.env` file:
```bash
GOOGLE_CLIENT_ID="your-client-id-here.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-your-client-secret-here"
```

---

## 🚀 Quick Setup Checklist

1. ✅ Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. ✅ Generate `NEXTAUTH_SECRET`:
   ```bash
   openssl rand -base64 32
   ```

3. ✅ Set up Google OAuth (follow steps above)

4. ✅ Update `.env` with your credentials

5. ✅ Never commit `.env` to git (already in `.gitignore`)

6. ✅ Push database schema:
   ```bash
   npx drizzle-kit push
   ```

7. ✅ Start development server:
   ```bash
   npm run dev
   ```

---

## 🔒 Security Best Practices

### ✅ DO:
- Use different secrets for development and production
- Keep `.env` file out of version control
- Use environment-specific `.env` files (`.env.local`, `.env.production`)
- Rotate secrets periodically
- Use strong, random secrets (32+ characters)

### ❌ DON'T:
- Commit `.env` files to git
- Share credentials in Slack/Discord/Email
- Use the same secret across environments
- Use predictable or simple secrets
- Hardcode credentials in source code

---

## 🌐 Production Deployment

### Vercel
1. Go to your project settings
2. Navigate to **"Environment Variables"**
3. Add each variable from your `.env` file
4. Set appropriate environments (Production, Preview, Development)

### Netlify
1. Go to **"Site settings" → "Environment variables"**
2. Add each variable
3. Trigger a new deployment

### Railway / Render / Fly.io
1. Use their CLI or dashboard to set environment variables
2. Follow their specific documentation for secrets management

---

## 🆘 Troubleshooting

### "Invalid credentials" error
- Check that `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are correct
- Verify that redirect URIs match exactly (including `http`/`https` and trailing slashes)

### "Secret is not defined" error
- Ensure `NEXTAUTH_SECRET` is set in `.env`
- Restart your development server after changing `.env`

### "Database connection failed"
- Verify `DATABASE_URL` is correct
- Check that PostgreSQL is running
- Ensure database exists and is accessible

### OAuth redirect URI mismatch
- Add your current domain to Google Console's authorized redirect URIs
- Format: `https://yourdomain.com/api/auth/callback/google`
- For local development: `http://localhost:3000/api/auth/callback/google`

---

## 📞 Need Help?

- Google OAuth Docs: https://developers.google.com/identity/protocols/oauth2
- NextAuth.js Docs: https://next-auth.js.org/getting-started/introduction
- Drizzle ORM Docs: https://orm.drizzle.team/docs/overview
