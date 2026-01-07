# TLU HUB Website

*Educational platform for TLU students*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/vuongvietcuong2004-6676s-projects/v0-tlu-hub-website)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-black?style=for-the-badge&logo=next.js)](https://nextjs.org)

## 📋 Prerequisites

- Node.js 18+ and pnpm
- Backend API running (default: http://localhost:5000)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Environment Configuration

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Update `.env.local` with your backend API URL:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
NODE_ENV=development
NEXT_PUBLIC_API_DEBUG=true
```

### 3. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `NEXT_PUBLIC_API_BASE_URL` | Backend API URL | `http://localhost:5000` | Yes |
| `NODE_ENV` | Environment mode | `development` | Yes |
| `NEXT_PUBLIC_API_TIMEOUT` | API request timeout (ms) | `30000` | No |
| `NEXT_PUBLIC_API_DEBUG` | Enable API logging | `true` | No |

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── login/             # Login page
│   ├── dashboard/         # Dashboard pages
│   ├── courses/           # Courses pages
│   └── documents/         # Documents pages
├── components/            # React components
├── lib/                   # Library code
│   ├── api.ts            # API client
│   ├── types.ts          # TypeScript types
│   └── auth-context.tsx  # Auth context
├── hooks/                 # Custom React hooks
│   └── use-api.ts        # API hook
├── docs/                  # Documentation
│   └── swagger.json      # API specification
├── .env.example          # Environment template
└── .env.local            # Local environment (git-ignored)
```

## 🔐 Authentication

**Demo Credentials (Development):**
- Student ID: `2251961779`
- Password: `123`

## 🌐 API Integration

All API calls are in [lib/api.ts](lib/api.ts):

```typescript
import { api } from "@/lib/api"

// Login
const response = await api.login(studentId, password)

// Get documents
const documents = await api.getStudentDocuments(studentId)
```

## 🧪 Development

```bash
pnpm dev      # Start dev server
pnpm build    # Build for production
pnpm start    # Start production server
pnpm lint     # Lint code
```

## 📚 Documentation

- Full API documentation: [docs/swagger.json](docs/swagger.json)
- [Next.js Documentation](https://nextjs.org/docs)

## Deployment

**Production URL:** [https://vercel.com/vuongvietcuong2004-6676s-projects/v0-tlu-hub-website](https://vercel.com/vuongvietcuong2004-6676s-projects/v0-tlu-hub-website)