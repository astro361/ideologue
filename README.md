# 💡 IdeaLogue

<div align="center">

**Ultra-aesthetic minimalist platform for sharing and exploring SaaS ideas**

A complete fullstack web application built with Next.js 16, PostgreSQL, and Google OAuth authentication, featuring an ultra-premium minimalist design system.

![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=flat-square&logo=next.js)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-blue?style=flat-square&logo=postgresql)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38bdf8?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

[Live Demo](#) • [Documentation](./SETUP_GUIDE.md) • [Report Bug](https://github.com/yourusername/idealogue/issues) • [Request Feature](https://github.com/yourusername/idealogue/issues)

</div>

---

## ✨ Features

### 🎨 Ultra-Aesthetic Design
- **Glassmorphism UI** with frosted glass cards and subtle backdrop blur
- **90% Monochrome** color scheme with sophisticated muted accents
- **Premium Typography** with editorial letter-spacing and kerning
- **Smooth Micro-interactions** - 0.4s transitions on every element
- **Maximum Breathing Room** - doubled padding and generous white space

### 🔐 Authentication
- **Google OAuth** integration with NextAuth v5
- **Session Management** with database persistence
- **Protected Routes** using Next.js 16 proxy middleware
- **Access Control** - only owners can edit/delete their ideas

### 💬 Core Features
- **Explore Feed** - Masonry grid of ideas with search and tag filtering
- **User Dashboard** - Personal collection with stats and analytics
- **Submit Ideas** - Step-by-step form with AI refinement
- **Idea Deep Dive** - Full details with comments and upvotes
- **Real-time Upvoting** - Toggle upvotes with smooth animations
- **Comment System** - Active brainstorming discussions

### 🤖 AI Integration
- **Refine with AI** button to structure and polish content
- Auto-formatting for titles, teasers, and execution strategies

---

## 📸 Screenshots

<div align="center">

### Landing Page
![Landing Page](https://via.placeholder.com/800x450/F9F9FB/4A5568?text=Landing+Page+Screenshot)

### Idea Detail
![Idea Detail](https://via.placeholder.com/800x450/F9F9FB/4A5568?text=Idea+Detail+Screenshot)

### Dashboard
![Dashboard](https://via.placeholder.com/800x450/F9F9FB/4A5568?text=Dashboard+Screenshot)

</div>

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL 15+
- Google OAuth credentials ([How to get?](./SETUP_GUIDE.md#how-to-get-google-oauth-credentials))

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/idealogue.git
cd idealogue
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
```bash
# Copy the example environment file
cp .env.example .env
```

Edit `.env` and add your credentials:
```bash
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/app_db
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<generate with: openssl rand -base64 32>
GOOGLE_CLIENT_ID=<from Google Cloud Console>
GOOGLE_CLIENT_SECRET=<from Google Cloud Console>
```

**📖 Need help?** See our comprehensive guides:
- [Quick Reference](./ENV_QUICK_REFERENCE.md) - Fast lookup
- [Visual Guide](./ENV_VISUAL_GUIDE.md) - Diagrams & flowcharts
- [Complete Setup Guide](./SETUP_GUIDE.md) - Step-by-step instructions

### 4. Database Setup
```bash
# Push schema to database
npx drizzle-kit push
```

### 5. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 📁 Project Structure

```
idealogue/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # NextAuth handlers
│   │   │   ├── ideas/         # Ideas CRUD
│   │   │   ├── refine/        # AI refinement
│   │   │   └── user/          # User data
│   │   ├── auth/              # Auth pages
│   │   ├── dashboard/         # User dashboard
│   │   ├── idea/[id]/         # Idea detail pages
│   │   ├── submit/            # Submit idea form
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   └── globals.css        # Global styles + design system
│   ├── components/            # Reusable components
│   │   ├── Header.tsx         # Navigation header
│   │   └── IdeaCard.tsx       # Idea card component
│   ├── db/                    # Database
│   │   ├── schema.ts          # Drizzle schema
│   │   └── index.ts           # Database client
│   ├── types/                 # TypeScript definitions
│   └── auth.ts                # NextAuth configuration
├── proxy.ts                   # Next.js 16 middleware
├── .env                       # Environment variables (gitignored)
├── .env.example               # Environment template
├── SETUP_GUIDE.md            # Detailed setup instructions
├── ENV_QUICK_REFERENCE.md    # Quick env reference
└── DESIGN_SYSTEM.md          # Design system documentation
```

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - UI library with Server Components
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

### Backend
- **Next.js API Routes** - RESTful API
- **NextAuth v5** - Authentication
- **Drizzle ORM** - Type-safe database toolkit
- **PostgreSQL** - Relational database

### DevOps
- **TypeScript** - Type safety
- **Drizzle Kit** - Database migrations
- **ESLint** - Code linting

---

## 📚 Environment Variables Guide

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `NEXTAUTH_URL` | App base URL | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | Session encryption key | Generate with `openssl rand -base64 32` |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID | `xxxxx.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Secret | `GOCSPX-xxxxx` |

**📖 Full Setup Guide**: [SETUP_GUIDE.md](./SETUP_GUIDE.md)

---

## 🎨 Design System

IdeaLogue features an **ultra-aesthetic minimalist design system**:

### Colors
- Background: `#F9F9FB` (soft premium off-white)
- Glass Cards: `rgba(255,255,255,0.7)` with 12px blur
- Accents: Charcoal `#4A5568`, Slate `#64748B`, Sage `#8B9A8B`

### Typography
- Tight letter-spacing (`-0.03em`) on headings
- Wide spacing (`0.1em`) on uppercase labels  
- Generous line-height (`1.7`) on body text

### Components
- Pill-shaped buttons with smooth hover effects
- Glassmorphic cards with subtle borders
- Frosted navbar with backdrop blur
- Maximum white space and breathing room

**📖 Full Design Documentation**: [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)

---

## 🗄️ Database Schema

### Tables
- **users** - User accounts (from Google OAuth)
- **ideas** - Business ideas with metadata
- **comments** - Discussion comments on ideas
- **upvotes** - User upvote tracking
- **accounts** - NextAuth account linking
- **sessions** - NextAuth session management

---

## 📦 Available Scripts

```bash
# Development
npm run dev          # Start dev server (with Turbopack)

# Build
npm run build        # Production build
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run typecheck    # TypeScript type checking

# Database
npx drizzle-kit push        # Push schema changes
npx drizzle-kit studio      # Open Drizzle Studio (DB GUI)
```

---

## 🚢 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import project in Vercel
3. Add environment variables in project settings
4. Add Vercel Postgres database (auto-configures `DATABASE_URL`)
5. Deploy!

### Other Platforms
Works on any platform supporting Next.js 16:
- Netlify
- Railway  
- Fly.io
- Render
- Self-hosted with Node.js

**Important**: Ensure all environment variables are set in your platform's dashboard.

---

## 🔐 Security Notes

- ✅ All routes protected with NextAuth
- ✅ Row-level ownership validation
- ✅ SQL injection prevention via Drizzle ORM
- ✅ CSRF protection via NextAuth
- ✅ Session encryption with `NEXTAUTH_SECRET`
- ⚠️ Never commit `.env` to version control
- ⚠️ Use different secrets for production

---

## 🤝 Contributing

We love contributions! Whether it's bug fixes, new features, or documentation improvements, all contributions are welcome.

### How to Contribute

1. **Fork the repository**
   ```bash
   # Click the 'Fork' button at the top right of this page
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/yourusername/idealogue.git
   cd idealogue
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

4. **Make your changes**
   - Write clean, readable code
   - Follow the existing code style
   - Add tests if applicable
   - Update documentation

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add: Amazing new feature"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

7. **Open a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Describe your changes in detail

### Contribution Guidelines

- **Code Style**: Follow the existing TypeScript/React patterns
- **Commits**: Use clear, descriptive commit messages
- **PRs**: One feature per pull request
- **Testing**: Test your changes locally before submitting
- **Documentation**: Update relevant docs if needed

### Areas We Need Help

- [ ] Dark mode implementation
- [ ] Mobile responsiveness improvements
- [ ] Additional OAuth providers (GitHub, Twitter)
- [ ] Advanced search functionality
- [ ] Email notifications
- [ ] API documentation
- [ ] Unit and integration tests

See [CONTRIBUTING.md](./CONTRIBUTING.md) for more details.

---

## 📄 License

MIT License - feel free to use this project however you'd like!

---

## 🆘 Support

- **Setup Issues**: See [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- **Quick Reference**: See [ENV_QUICK_REFERENCE.md](./ENV_QUICK_REFERENCE.md)
- **Design Questions**: See [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)

---

## 🎯 Roadmap

- [ ] Email notifications for comments
- [ ] Idea tagging system improvements  
- [ ] Advanced search with filters
- [ ] User profiles and following
- [ ] Idea collaboration features
- [ ] Export ideas to PDF/Markdown
- [ ] Dark mode support
- [ ] Mobile app (React Native)

---

**Built with ❤️ using Next.js 16 and modern web technologies**
