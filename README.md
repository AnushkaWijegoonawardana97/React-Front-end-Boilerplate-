# React Frontend Boilerplate

A production-ready React frontend boilerplate built with Vite, TypeScript, Tailwind CSS, and Shadcn UI. This project follows Atomic Design principles and includes comprehensive tooling for modern web development.

## Features

- ⚡ **Vite** - Lightning-fast build tool and dev server
- ⚛️ **React 19** - Latest React with modern hooks and features
- 🔷 **TypeScript** - Full type safety and excellent developer experience
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🧩 **Shadcn UI** - Beautiful, accessible component library
- 📦 **Atomic Design** - Scalable component architecture
- 📧 **EmailJS** - Email service integration
- 🎭 **Framer Motion** - Animation library
- 🔄 **React Query** - Powerful data synchronization
- 🚀 **GitHub Actions** - CI/CD with automated releases
- 📝 **ESLint** - Code quality and consistency

## Prerequisites

- Node.js 20+ 
- pnpm 9+ (recommended) or npm/yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd React-Front-end-Boilerplate
```

2. Install dependencies:
```bash
pnpm install
```

3. Copy environment variables:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
```

5. Start the development server:
```bash
pnpm dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── atoms/          # Basic building blocks (Button, Input, Label, Card, Alert, Table, Dialog, etc.)
│   ├── molecules/      # Simple component groups (FormField, Card, Alert)
│   ├── organisms/      # Complex UI sections (Header, DataTable, Form)
│   ├── templates/      # Page layouts (DashboardLayout, AuthLayout)
│   └── pages/          # Full page components (HomePage, ExamplePage)
├── constants/          # Application-wide constants
├── context/            # React Context providers
├── hooks/              # Custom React hooks
├── services/           # API and external service integrations
├── types/              # TypeScript type definitions
└── utils/              # Utility functions and helpers
```

## Atomic Design Structure

This project follows Atomic Design principles for scalable component architecture:

### Atoms
Basic building blocks that cannot be broken down further. Examples:
- `Button` - Reusable button component
- `Input` - Form input field
- `Label` - Form label
- `Card` - Card container component
- `Alert` - Alert/notification component
- `Table` - Table component with all sub-components
- `Dialog` - Dialog/modal component
- `DropdownMenu` - Dropdown menu component
- `Form` - Form components (FormField, FormItem, etc.)

**Location**: `src/components/atoms/`

### Molecules
Simple combinations of atoms that form simple UI patterns. Examples:
- `FormField` - Input with label and error handling
- `Card` - Composed card with header, content, and footer (uses atom Card)
- `Alert` - Composed alert with icon and structured content (uses atom Alert)

**Location**: `src/components/molecules/`

### Organisms
Complex UI components that combine molecules and atoms. Examples:
- `Header` - Application header with navigation
- `DataTable` - Data table with sorting and filtering
- `Form` - Complete form with validation

**Location**: `src/components/organisms/`

### Templates
Page-level layouts that define structure. Examples:
- `DashboardLayout` - Layout for dashboard pages
- `AuthLayout` - Layout for authentication pages

**Location**: `src/components/templates/`

### Pages
Full page components that compose templates and organisms. Examples:
- `HomePage` - Home page component
- `ExamplePage` - Example page with data table

**Location**: `src/components/pages/`

## Component Development Guidelines

### Creating a New Component

1. **Choose the right level**: Determine if your component is an atom, molecule, organism, template, or page.

2. **Create component folder**:
```bash
src/components/[level]/ComponentName/
```

3. **Create component file**:
```typescript
// src/components/atoms/Button/Button.tsx
import * as React from 'react'
import { cn } from '@/utils/cn'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md text-sm font-medium',
          variant === 'default' && 'bg-primary text-primary-foreground',
          size === 'default' && 'h-10 px-4 py-2',
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'
```

4. **Create index file**:
```typescript
// src/components/atoms/Button/index.ts
export { Button } from './Button'
export type { ButtonProps } from './Button'
```

5. **Follow naming conventions**:
   - Component files: PascalCase (e.g., `UserProfile.tsx`)
   - Component folders: PascalCase (e.g., `UserProfile/`)
   - Export names: PascalCase (e.g., `export const UserProfile`)

### Component Rules

- ✅ Each component in its own folder
- ✅ Use TypeScript for all components
- ✅ Define proper prop interfaces
- ✅ Use Shadcn UI components as base when available
- ✅ Follow single responsibility principle
- ✅ Make components reusable and composable
- ❌ Don't mix component levels (atoms can't depend on molecules)
- ❌ Don't use `any` type
- ❌ Don't duplicate code (extract to shared components/hooks)

## Styling with Tailwind CSS

This project uses Tailwind CSS for all styling. Shadcn UI components are pre-styled and can be customized using Tailwind classes.

### Using Tailwind Classes

```tsx
<div className="flex items-center justify-between p-4 bg-background">
  <h1 className="text-2xl font-bold text-foreground">Title</h1>
</div>
```

### Using the `cn()` Utility

For conditional classes, use the `cn()` utility:

```tsx
import { cn } from '@/utils/cn'

<div className={cn(
  'base-class',
  isActive && 'active-class',
  className
)}>
```

## Git Commit Guidelines

This project follows [Semantic Commit Messages](https://www.conventionalcommits.org/) for automated versioning.

### Commit Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Commit Types

- `feat`: New feature (triggers **minor** version bump)
- `fix`: Bug fix (triggers **patch** version bump)
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `ci`: CI/CD changes
- `build`: Build system changes

### Breaking Changes

For breaking changes, include `BREAKING CHANGE:` in the footer (triggers **major** version bump):

```
feat(api): change authentication flow

BREAKING CHANGE: Authentication now requires OAuth2 instead of basic auth
```

### Examples

```bash
feat(auth): add user login functionality
fix(api): resolve CORS error in production
feat(components): add new DataTable component
docs(readme): update installation instructions
```

## Pull Request Guidelines

### PR Requirements

1. **Title**: Must follow semantic commit format
2. **Description**: Must include:
   - What changes were made
   - Why the changes were made
   - How to test the changes
   - Screenshots (for UI changes)
3. **Validation**: All CI checks must pass
4. **Review**: At least one team member approval required
5. **Up to date**: PR must be synced with main branch

### PR Validation

The following checks run automatically on every PR:

- ✅ Build succeeds
- ✅ Linting passes
- ✅ TypeScript compilation succeeds
- ✅ No merge conflicts

**PRs will be blocked from merging if any validation fails.**

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

## Environment Variables

Create a `.env` file in the root directory (use `.env.example` as a template):

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api

# EmailJS Configuration
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
```

**Important**: Never commit `.env` files. They are automatically ignored by git.

## EmailJS Setup

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create an email service
3. Create an email template
4. Get your Public Key, Service ID, and Template ID
5. Add them to your `.env` file

### Using EmailJS

```typescript
import { useEmailJS } from '@/hooks/useEmailJS'

const { send, loading, error, success } = useEmailJS()

const handleSend = async () => {
  await send({
    to_name: 'John Doe',
    from_name: 'Jane Smith',
    from_email: 'jane@example.com',
    message: 'Hello!',
    subject: 'Test Email'
  })
}
```

## Framer Motion Animations

This project includes Framer Motion for animations. Pre-configured animation variants are available in `src/utils/animations.ts`.

### Using Animations

```typescript
import { motion } from 'framer-motion'
import { fadeIn } from '@/utils/animations'

<motion.div
  initial="hidden"
  animate="visible"
  variants={fadeIn}
>
  Content
</motion.div>
```

## GitHub Actions

### PR Validation

Automatically runs on every PR to `main`:
- Installs dependencies
- Runs linter
- Builds the project
- Blocks merge if any step fails

### Auto Release

Automatically runs on merge to `main`:
- Detects version bump type from commit messages
- Updates `package.json` version
- Creates GitHub release with auto-generated notes
- Creates git tag

**Version Bump Rules**:
- `feat:` → Minor version bump
- `fix:` → Patch version bump
- `BREAKING CHANGE:` → Major version bump

## Code Quality

This project enforces code quality through:

- **TypeScript**: Strict type checking
- **ESLint**: Code linting and best practices
- **Cursor Rules**: Development guidelines in `.cursorrules`
- **SOLID Principles**: Object-oriented design principles
- **Atomic Design**: Scalable component architecture

## Best Practices

### DO ✅

- Follow Atomic Design structure
- Use TypeScript for all files
- Write self-documenting code
- Use Shadcn UI components
- Follow semantic commit messages
- Handle errors gracefully
- Write reusable components
- Use custom hooks for shared logic

### DON'T ❌

- Use `any` type
- Mix component levels
- Commit secrets or API keys
- Ignore TypeScript errors
- Duplicate code
- Over-engineer solutions
- Skip PR validation

## Contributing

1. Create a feature branch from `main`
2. Make your changes following the guidelines
3. Write semantic commit messages
4. Create a PR with detailed description
5. Ensure all CI checks pass
6. Get at least one approval
7. Merge to `main` (triggers auto-release)

## License

[Add your license here]

## Support

For questions or issues, please [open an issue](https://github.com/your-repo/issues) or contact the development team.
