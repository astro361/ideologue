# 🚀 Deployment Guide

This guide will help you deploy IdeaLogue to production.

## 📋 Table of Contents

- [Pre-Deployment Checklist](#pre-deployment-checklist)
- [Vercel Deployment](#vercel-deployment-recommended)
- [Other Platforms](#other-platforms)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Post-Deployment](#post-deployment)
- [Troubleshooting](#troubleshooting)

---

## ✅ Pre-Deployment Checklist

Before deploying, ensure:

- [ ] All features are tested locally
- [ ] TypeScript compiles without errors (`npm run typecheck`)
- [ ] Production build succeeds (`npm run build`)
- [ ] Environment variables are documented
- [ ] Database schema is finalized
- [ ] Google OAuth is configured for production domain
- [ ] Security best practices are followed

---

## 🌐 Vercel Deployment (Recommended)

Vercel is the easiest way to deploy Next.js applications.

### Step 1: Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Add remote
git remote add origin https://github.com/yourusername/idealogue.git

# Push
git push -u origin main
```

### Step 2: Import to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"New Project"**
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings ✅

### Step 3: Add Database

1. In Vercel project dashboard
2. Go to **Storage** tab
3. Click **Create Database**
4. Choose **Postgres**
5. Click **Create**
6. Vercel automatically sets `DATABASE_URL` ✅

### Step 4: Configure Environment Variables

In Vercel project settings → **Environment Variables**, add:

```bash
# NextAuth Configuration
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=<generate new with: openssl rand -base64 32>

# Google OAuth (same credentials, but update redirect URIs)
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-your-secret
```

### Step 5: Update Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Navigate to **APIs & Services → Credentials**
3. Edit your OAuth Client ID
4. Add to **Authorized redirect URIs**:
   ```
   https://your-app.vercel.app/api/auth/callback/google
   ```
5. Click **Save**

### Step 6: Deploy

```bash
# Vercel will auto-deploy on push to main
git push origin main

# Or deploy manually
npx vercel --prod
```

### Step 7: Push Database Schema

After first deployment:

```bash
# Connect to production database
DATABASE_URL="<your-vercel-postgres-url>" npx drizzle-kit push
```

✅ **Done!** Your app is live at `https://your-app.vercel.app`

---

## 🖥️ Other Platforms

### Netlify

1. **Connect Repository**
   - Go to [netlify.com](https://netlify.com)
   - Import from GitHub

2. **Build Settings**
   ```
   Build command: npm run build
   Publish directory: .next
   ```

3. **Environment Variables**
   - Add all variables from `.env`
   - Set `NEXTAUTH_URL` to your Netlify domain

4. **Database**
   - Use Neon, Supabase, or other managed Postgres
   - Update `DATABASE_URL`

### Railway

1. **Deploy from GitHub**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli

   # Login
   railway login

   # Link project
   railway link

   # Deploy
   railway up
   ```

2. **Add Postgres**
   ```bash
   railway add postgresql
   ```
   Railway auto-sets `DATABASE_URL` ✅

3. **Set Variables**
   ```bash
   railway variables set NEXTAUTH_URL=https://your-app.railway.app
   railway variables set NEXTAUTH_SECRET=<your-secret>
   railway variables set GOOGLE_CLIENT_ID=<your-id>
   railway variables set GOOGLE_CLIENT_SECRET=<your-secret>
   ```

### Self-Hosted (VPS)

1. **Server Requirements**
   - Ubuntu 22.04+ / Debian 11+
   - Node.js 18+
   - PostgreSQL 15+
   - Nginx

2. **Clone and Install**
   ```bash
   git clone https://github.com/yourusername/idealogue.git
   cd idealogue
   npm install
   npm run build
   ```

3. **Environment Variables**
   ```bash
   cp .env.example .env
   nano .env  # Edit with your values
   ```

4. **Database Setup**
   ```bash
   sudo -u postgres psql
   CREATE DATABASE idealogue;
   \q
   
   npx drizzle-kit push
   ```

5. **Process Manager (PM2)**
   ```bash
   npm install -g pm2
   pm2 start npm --name "idealogue" -- start
   pm2 save
   pm2 startup
   ```

6. **Nginx Configuration**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

7. **SSL with Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```

---

## 🔐 Environment Variables

### Production Values

```bash
# Database - Use managed service
DATABASE_URL=postgresql://user:pass@provider.com:5432/db

# NextAuth - Your production domain
NEXTAUTH_URL=https://yourdomain.com

# NextAuth Secret - MUST generate new one
NEXTAUTH_SECRET=<run: openssl rand -base64 32>

# Google OAuth - Same credentials, update redirect URIs
GOOGLE_CLIENT_ID=your-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-your-secret
```

### Security Notes

⚠️ **Critical**:
- Generate a NEW `NEXTAUTH_SECRET` for production
- NEVER reuse development secrets
- Use environment-specific variables in your platform
- Enable SSL/HTTPS for production

---

## 🗄️ Database Setup

### Recommended Managed Services

1. **Vercel Postgres**
   - Integrated with Vercel
   - Auto-configured `DATABASE_URL`
   - Easy scaling

2. **Neon** ([neon.tech](https://neon.tech))
   - Serverless Postgres
   - Generous free tier
   - Instant branching

3. **Supabase** ([supabase.com](https://supabase.com))
   - Full Postgres with auth
   - Real-time subscriptions
   - Built-in APIs

4. **Railway** ([railway.app](https://railway.app))
   - One-click Postgres
   - Auto-backups
   - Easy management

### Migration

After setting up database:

```bash
# Push schema to production
DATABASE_URL="your-production-url" npx drizzle-kit push

# Or set in environment and run
npx drizzle-kit push
```

---

## ✅ Post-Deployment

### 1. Test Authentication

1. Visit your production URL
2. Click **Sign In**
3. Authenticate with Google
4. Verify you're redirected back logged in

### 2. Test Core Features

- [ ] Create an idea
- [ ] View idea details
- [ ] Upvote an idea
- [ ] Comment on an idea
- [ ] View dashboard
- [ ] Search functionality

### 3. Monitor Errors

**Vercel**:
- Dashboard → Your Project → Logs
- Real-time error tracking

**Self-Hosted**:
```bash
# View logs
pm2 logs idealogue

# Monitor
pm2 monit
```

### 4. Set Up Analytics (Optional)

- **Vercel Analytics**: Enable in dashboard
- **Google Analytics**: Add tracking code
- **Plausible**: Privacy-friendly alternative

---

## 🐛 Troubleshooting

### Build Failures

**Error**: TypeScript errors
```bash
# Fix locally first
npm run typecheck
npm run build
```

**Error**: Missing dependencies
```bash
# Ensure package.json is committed
git add package.json package-lock.json
git commit -m "Update dependencies"
```

### Runtime Errors

**Error**: "Invalid credentials"
- Verify `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
- Check Google Console for correct redirect URIs

**Error**: "Database connection failed"
- Verify `DATABASE_URL` is correct
- Check database is accessible from your host
- Ensure SSL is configured if required

**Error**: "Secret is not defined"
- Ensure `NEXTAUTH_SECRET` is set in environment
- Redeploy after adding variables

### OAuth Issues

**Error**: Redirect URI mismatch
1. Go to Google Cloud Console
2. Add production URL to redirect URIs:
   ```
   https://yourdomain.com/api/auth/callback/google
   ```
3. Wait 5 minutes for propagation

**Error**: "Callback failed"
- Check `NEXTAUTH_URL` matches your domain exactly
- Ensure HTTPS is enabled in production

---

## 📊 Performance Optimization

### 1. Enable Caching

Next.js 16 has aggressive caching by default.

### 2. Image Optimization

```tsx
import Image from 'next/image';

// Use Next.js Image component
<Image src={url} width={100} height={100} alt="..." />
```

### 3. Database Indexing

Add indexes for frequently queried columns:
```sql
CREATE INDEX idx_ideas_user_id ON ideas(user_id);
CREATE INDEX idx_comments_idea_id ON comments(idea_id);
```

### 4. CDN

Vercel includes CDN automatically. For self-hosted:
- Use Cloudflare
- Enable asset caching
- Optimize image delivery

---

## 🔒 Security Checklist

Before going live:

- [ ] HTTPS is enforced
- [ ] All secrets are environment variables
- [ ] Database uses SSL connections
- [ ] CORS is properly configured
- [ ] Rate limiting is enabled (optional)
- [ ] Error messages don't leak sensitive info
- [ ] Dependencies are up to date
- [ ] `.env` is in `.gitignore`

---

## 📚 Additional Resources

- [Vercel Deployment Docs](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Drizzle Production Guide](https://orm.drizzle.team/docs/production)
- [NextAuth Production Checklist](https://next-auth.js.org/deployment)

---

## 🆘 Need Help?

- Check [GitHub Issues](https://github.com/yourusername/idealogue/issues)
- Join [Discussions](https://github.com/yourusername/idealogue/discussions)
- Review [Documentation](./SETUP_GUIDE.md)

---

**Congratulations on deploying IdeaLogue!** 🎉

Your SaaS idea platform is now live! 🚀
