# Contributing to IdeaLogue

First off, thank you for considering contributing to IdeaLogue! 🎉

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Coding Guidelines](#coding-guidelines)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code:

- **Be respectful** and inclusive
- **Be patient** with newcomers
- **Be constructive** in criticism
- **Focus on what is best** for the community
- **Show empathy** towards other community members

## 🤔 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates.

When creating a bug report, include:
- **Clear title** and description
- **Steps to reproduce** the behavior
- **Expected vs actual** behavior
- **Screenshots** if applicable
- **Environment details** (OS, Node version, browser)

**Template:**
```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g. macOS 14.0]
- Node: [e.g. 18.17.0]
- Browser: [e.g. Chrome 120]
```

### Suggesting Features

We love feature suggestions! Please:
- **Check existing issues** for similar requests
- **Describe the problem** it solves
- **Explain your proposed solution**
- **Consider alternatives** you've thought about

**Template:**
```markdown
**Is your feature request related to a problem?**
A clear description of the problem.

**Describe the solution you'd like**
What you want to happen.

**Describe alternatives**
Other solutions you've considered.

**Additional context**
Any other context or screenshots.
```

### Contributing Code

1. **Find an issue** to work on or create one
2. **Comment** on the issue to claim it
3. **Fork** the repository
4. **Create** a feature branch
5. **Make** your changes
6. **Test** thoroughly
7. **Submit** a pull request

## 🛠️ Development Setup

### 1. Fork and Clone
```bash
# Fork on GitHub, then:
git clone https://github.com/yourusername/idealogue.git
cd idealogue
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment
```bash
cp .env.example .env
# Edit .env with your credentials
```

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed instructions.

### 4. Set Up Database
```bash
npx drizzle-kit push
```

### 5. Run Development Server
```bash
npm run dev
```

### 6. Create a Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/issue-description
```

## 📝 Coding Guidelines

### TypeScript

- **Use TypeScript** for all new files
- **Define types** explicitly where helpful
- **Avoid `any`** types when possible
- **Use interfaces** for object shapes

```typescript
// ✅ Good
interface User {
  id: string;
  name: string;
  email: string;
}

// ❌ Bad
const user: any = { ... };
```

### React Components

- **Use functional components** with hooks
- **Keep components small** and focused
- **Extract reusable logic** into custom hooks
- **Use TypeScript** for prop types

```typescript
// ✅ Good
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export default function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}

// ❌ Bad
export default function Button(props) {
  return <button onClick={props.onClick}>{props.label}</button>;
}
```

### Styling

- **Use Tailwind utility classes** for styling
- **Follow the design system** defined in `globals.css`
- **Use custom classes** from design system:
  - `.glass-card` for cards
  - `.btn-accent` for primary buttons
  - `.input-pill` for inputs
- **Maintain 0.4s transitions** for smooth interactions

```tsx
// ✅ Good - Uses design system classes
<div className="glass-card glass-card-hover rounded-2xl p-8">
  <button className="btn-accent rounded-full px-6 py-3">
    Submit
  </button>
</div>

// ❌ Bad - Inline styles and no design system
<div style={{ background: 'white', padding: '20px' }}>
  <button style={{ background: 'blue' }}>Submit</button>
</div>
```

### File Organization

```
src/
├── app/              # Next.js pages (App Router)
│   ├── api/         # API routes
│   └── (pages)/     # Page components
├── components/       # Reusable components
├── db/              # Database schemas
├── types/           # TypeScript type definitions
└── lib/             # Utility functions
```

### Naming Conventions

- **Components**: PascalCase (`IdeaCard.tsx`)
- **Functions**: camelCase (`fetchIdeas()`)
- **Variables**: camelCase (`userName`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_TITLE_LENGTH`)
- **Files**: Match component name or describe content

## 💬 Commit Messages

Use clear, descriptive commit messages following conventional commits:

### Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, no logic change)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

### Examples
```bash
# ✅ Good
feat(auth): Add Google OAuth integration
fix(upvote): Prevent double-clicking upvote button
docs(readme): Update installation instructions
style(card): Improve glassmorphism effect
refactor(api): Simplify idea fetching logic

# ❌ Bad
update stuff
fixed bug
changes
wip
```

## 🔄 Pull Request Process

### Before Submitting

1. **Test your changes**
   ```bash
   npm run build
   npm run typecheck
   npm run lint
   ```

2. **Update documentation** if needed
   - README.md
   - API documentation
   - Code comments

3. **Ensure clean git history**
   ```bash
   git rebase -i main  # Squash commits if needed
   ```

### PR Template

```markdown
## Description
Brief description of changes.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## How Has This Been Tested?
Describe your testing process.

## Checklist
- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code where needed
- [ ] I have updated documentation
- [ ] My changes generate no new warnings
- [ ] I have tested locally
- [ ] My commit messages follow conventions
```

### Review Process

1. **Automated checks** must pass (build, lint, type check)
2. **At least one maintainer** must review
3. **Requested changes** must be addressed
4. **Approval** required before merging

### After Approval

- **Maintainers will merge** your PR
- **Your changes** will be deployed
- **You'll be added** to contributors list 🎉

## 🎨 Design Guidelines

Follow the ultra-aesthetic minimalist design system:

- **90% monochrome** - Use color sparingly
- **Glassmorphism** - Semi-transparent cards with blur
- **Smooth transitions** - 0.4s ease on all interactions
- **Maximum breathing room** - Generous padding and spacing
- **Premium typography** - Tight letter-spacing on headings

See [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for details.

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team)
- [NextAuth.js Documentation](https://next-auth.js.org)

## 🆘 Getting Help

- **Discord**: [Join our community](#)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/idealogue/discussions)
- **Issues**: [Report bugs or request features](https://github.com/yourusername/idealogue/issues)

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to IdeaLogue!** 💡✨
