# Deployment Guide

This guide covers deploying your Onflow Reports Viewer to various platforms.

## Prerequisites

Before deploying, ensure:
- Your Supabase project is set up and configured
- You have a `.env.local` file with valid credentials
- The app builds successfully (`npm run build`)
- You've tested the app locally (`npm run dev`)

## Option 1: Vercel (Recommended)

Vercel is the easiest deployment option for Next.js apps.

### Step 1: Prepare Your Repository

1. Initialize git if you haven't:
```bash
git init
git add .
git commit -m "Initial commit"
```

2. Push to GitHub:
```bash
# Create a new repository on GitHub, then:
git remote add origin https://github.com/yourusername/onflow-reports.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New Project"
4. Import your repository
5. Configure your project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

### Step 3: Add Environment Variables

In the Vercel dashboard:
1. Go to Settings > Environment Variables
2. Add your variables:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key
3. Select "Production", "Preview", and "Development"
4. Click "Save"

### Step 4: Deploy

1. Click "Deploy"
2. Wait for the build to complete (1-2 minutes)
3. Your app is now live at `your-app-name.vercel.app`

### Automatic Deployments

Every push to your main branch will automatically deploy to production.

## Option 2: Netlify

### Step 1: Prepare Build

1. Ensure your repository is on GitHub/GitLab/Bitbucket

### Step 2: Deploy to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Sign in and click "Add new site"
3. Import from Git
4. Select your repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`

### Step 3: Environment Variables

1. Go to Site settings > Environment variables
2. Add your Supabase credentials:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Step 4: Deploy

Click "Deploy site" and wait for completion.

## Option 3: Docker

### Create Dockerfile

```dockerfile
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### Update next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
}

module.exports = nextConfig
```

### Build and Run

```bash
# Build the Docker image
docker build -t onflow-reports .

# Run the container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SUPABASE_URL=your_url \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key \
  onflow-reports
```

### Deploy to Docker Hub

```bash
docker tag onflow-reports yourusername/onflow-reports
docker push yourusername/onflow-reports
```

## Option 4: AWS Amplify

### Step 1: Install Amplify CLI

```bash
npm install -g @aws-amplify/cli
amplify configure
```

### Step 2: Initialize Amplify

```bash
amplify init
```

Follow the prompts:
- Environment name: production
- Default editor: (your choice)
- App type: javascript
- Framework: react
- Source directory: .
- Build directory: .next
- Build command: npm run build
- Start command: npm start

### Step 3: Add Hosting

```bash
amplify add hosting
```

Choose:
- Hosting with Amplify Console
- Manual deployment

### Step 4: Configure Environment Variables

In AWS Amplify Console:
1. Go to App settings > Environment variables
2. Add your Supabase credentials

### Step 5: Deploy

```bash
amplify publish
```

## Option 5: Railway

### Step 1: Create Railway Account

Go to [railway.app](https://railway.app) and sign up.

### Step 2: Deploy from GitHub

1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your repository
4. Railway will auto-detect Next.js

### Step 3: Add Environment Variables

1. Go to Variables tab
2. Add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Step 4: Deploy

Railway will automatically build and deploy your app.

## Option 6: DigitalOcean App Platform

### Step 1: Create App

1. Go to [DigitalOcean App Platform](https://cloud.digitalocean.com/apps)
2. Click "Create App"
3. Connect your GitHub repository

### Step 2: Configure

- **Resource Type**: Web Service
- **Build Command**: `npm run build`
- **Run Command**: `npm start`
- **HTTP Port**: 3000

### Step 3: Environment Variables

Add your Supabase credentials in the Environment Variables section.

### Step 4: Deploy

Click "Create Resources" to deploy.

## Custom VPS Deployment

### Requirements

- Ubuntu 20.04+ or similar
- Node.js 18+
- nginx (for reverse proxy)
- PM2 (for process management)

### Step 1: Setup Server

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install nginx
sudo apt install nginx -y
```

### Step 2: Deploy Application

```bash
# Clone repository
git clone https://github.com/yourusername/onflow-reports.git
cd onflow-reports

# Install dependencies
npm ci

# Create .env.local
cat > .env.local << EOF
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
EOF

# Build
npm run build

# Start with PM2
pm2 start npm --name "onflow-reports" -- start
pm2 save
pm2 startup
```

### Step 3: Configure nginx

```bash
sudo nano /etc/nginx/sites-available/onflow-reports
```

Add:

```nginx
server {
    listen 80;
    server_name your-domain.com;

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

Enable site:

```bash
sudo ln -s /etc/nginx/sites-available/onflow-reports /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 4: SSL with Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d your-domain.com
```

## Post-Deployment Checklist

After deploying to any platform:

- [ ] Test the home page loads
- [ ] Verify environment variables are set correctly
- [ ] Insert a test report in Supabase
- [ ] Test accessing a report by UUID
- [ ] Check that 404 page works for invalid UUIDs
- [ ] Verify responsive design on mobile
- [ ] Test all links work correctly
- [ ] Check console for errors
- [ ] Monitor initial load times
- [ ] Set up error tracking (optional: Sentry, LogRocket)

## Monitoring & Analytics

### Recommended Tools

1. **Vercel Analytics**: Built-in for Vercel deployments
2. **Google Analytics**: Add to `app/layout.tsx`
3. **Sentry**: For error tracking
4. **Supabase Logs**: Monitor database queries

### Add Google Analytics

```typescript
// app/layout.tsx
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
      <GoogleAnalytics gaId="G-XXXXXXXXXX" />
    </html>
  )
}
```

## Scaling Considerations

### Database
- Monitor Supabase usage
- Upgrade plan if needed
- Add database indexes for better performance

### CDN
- Vercel automatically provides global CDN
- For other platforms, consider Cloudflare

### Caching
- Reports can be cached with `revalidate` option
- Add ISR (Incremental Static Regeneration) if needed

### Performance
- Monitor Core Web Vitals
- Optimize images if added
- Consider lazy loading for large reports

## Troubleshooting

### Build Fails

**Issue**: Environment variables not found
**Solution**: Ensure all variables are set in platform settings

**Issue**: Type errors during build
**Solution**: Run `npm run build` locally to identify issues

### Runtime Errors

**Issue**: "Report Not Found" for all reports
**Solution**: Check Supabase connection and credentials

**Issue**: Slow page loads
**Solution**: Check Supabase region matches deployment region

### Database Issues

**Issue**: Reports not fetching
**Solution**: Verify Row Level Security policies in Supabase

## Updating After Deployment

### Vercel/Netlify/Railway
Simply push to your main branch - automatic deployment

### Docker
```bash
docker build -t onflow-reports:latest .
docker push yourusername/onflow-reports:latest
```

### VPS
```bash
cd onflow-reports
git pull
npm ci
npm run build
pm2 restart onflow-reports
```

## Rollback

### Vercel
- Go to Deployments
- Find previous deployment
- Click "Promote to Production"

### Docker
```bash
docker pull yourusername/onflow-reports:previous-tag
docker stop current-container
docker run new-container
```

## Support

For deployment issues:
- Check platform-specific documentation
- Review deployment logs
- Verify environment variables
- Test locally first with production build
