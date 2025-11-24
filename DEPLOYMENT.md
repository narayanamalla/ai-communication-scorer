# Deployment Guide - AI Communication Scorer

This document provides detailed step-by-step instructions for deploying the AI Communication Scorer application on your local server.

## Table of Contents
1. [System Requirements](#system-requirements)
2. [Pre-Installation Setup](#pre-installation-setup)
3. [Installation Steps](#installation-steps)
4. [Configuration](#configuration)
5. [Running the Application](#running-the-application)
6. [Production Deployment](#production-deployment)
7. [Troubleshooting](#troubleshooting)

---

## System Requirements

### Minimum Requirements
- **Operating System**: Windows 10/11, macOS 10.15+, or Linux (Ubuntu 18.04+)
- **RAM**: 4GB minimum (8GB recommended)
- **Disk Space**: 500MB free space
- **Processor**: Dual-core 2.0GHz or higher
- **Internet**: Required for initial setup and AI features

### Software Requirements
- **Node.js**: Version 14.0.0 or higher
- **npm**: Version 6.0.0 or higher (comes with Node.js)
- **Git**: For cloning the repository (optional)
- **Modern Web Browser**: Chrome, Firefox, Safari, or Edge (latest version)

---

## Pre-Installation Setup

### Step 1: Install Node.js and npm

#### On macOS
```bash
# Using Homebrew
brew install node

# Verify installation
node --version
npm --version
```

#### On Windows
1. Download Node.js installer from [https://nodejs.org/](https://nodejs.org/)
2. Run the installer (.msi file)
3. Follow installation wizard
4. Open Command Prompt and verify:
```cmd
node --version
npm --version
```

#### On Linux (Ubuntu/Debian)
```bash
# Update package index
sudo apt update

# Install Node.js and npm
sudo apt install nodejs npm

# Verify installation
node --version
npm --version
```

### Step 2: Get Hugging Face API Key (Optional but Recommended)

1. Visit [https://huggingface.co/](https://huggingface.co/)
2. Create a free account or sign in
3. Go to Settings → Access Tokens
4. Click "New Token"
5. Name your token (e.g., "communication-scorer")
6. Select "Read" permission
7. Click "Generate token"
8. **Copy the token** - you'll need it later

---

## Installation Steps

### Step 1: Download/Clone the Project

#### Option A: Clone with Git
```bash
# Navigate to desired directory
cd ~/Desktop

# Clone repository
git clone <repository-url>
cd NIRMAAN
```

#### Option B: Download ZIP
1. Download the project ZIP file
2. Extract to desired location
3. Open terminal/command prompt
4. Navigate to project folder:
```bash
cd path/to/NIRMAAN
```

### Step 2: Install Project Dependencies

```bash
# Install all dependencies from package.json
npm install
```

**Expected Output:**
- Progress bar showing package downloads
- "added XXX packages" message
- Possible security audit warnings (normal)

**Installation Time:** 2-5 minutes depending on internet speed

### Step 3: Verify Installation

Check if key packages are installed:
```bash
npm list react vite xlsx jspdf
```

You should see the package versions listed.

---

## Configuration

### Step 1: Create Environment File

Create a `.env` file in the project root directory:

```bash
# On macOS/Linux
touch .env

# On Windows (Command Prompt)
type nul > .env
```

### Step 2: Configure Environment Variables

Open `.env` file in a text editor and add:

```env
# Hugging Face API Configuration
VITE_HUGGINGFACE_API_KEY=your-actual-api-key-here

# Optional: Custom Port (default is 4028)
# VITE_PORT=3000
```

**Replace** `your-actual-api-key-here` with your actual Hugging Face API key from Pre-Installation Step 2.

### Step 3: Verify Configuration Files

Ensure these files exist in your project:
- ✅ `package.json` - Project dependencies
- ✅ `vite.config.mjs` - Build configuration
- ✅ `tailwind.config.js` - Styling configuration
- ✅ `.env` - Environment variables (you just created this)

---

## Running the Application

### Development Mode

#### Step 1: Start the Development Server
```bash
npm start
```

**Expected Output:**
```
> ai-communication-scorer@0.1.0 start
> vite

  VITE v5.0.0  ready in 320 ms

  ➜  Local:   http://localhost:4028/
  ➜  Network: http://10.x.x.x:4028/
  ➜  press h + enter to show help
```

#### Step 2: Access the Application

Open your web browser and navigate to:
```
http://localhost:4028
```

#### Step 3: Verify Application is Working

You should see:
- Dashboard page loads successfully
- Navigation menu is functional
- No error messages in browser console

### Testing the Application

1. **Navigate to Transcript Submission**
2. **Enter sample text:**
   ```
   Hello, I'm a software engineer with 5 years of experience in full-stack 
   development. I specialize in React and Node.js, and I'm passionate about 
   creating user-friendly applications. I've led teams of 3-5 developers and 
   successfully delivered 10+ projects.
   ```
3. **Click "Submit for Analysis"**
4. **Verify results page loads** with scoring breakdown

---

## Production Deployment

### Step 1: Build the Application

```bash
npm run build
```

**Output:**
- Creates `dist/` folder with optimized files
- Minified JavaScript and CSS
- Compressed assets

### Step 2: Preview Production Build

```bash
npm run serve
```

This runs the production build locally for testing.

### Step 3: Deploy to Production Server

#### Option A: Static File Server (Nginx, Apache)

1. Copy `dist/` folder contents to web server
2. Configure server to serve `index.html` for all routes
3. Set appropriate CORS headers if needed

#### Option B: Node.js Server

```bash
# Install serve globally
npm install -g serve

# Serve the dist folder
serve -s dist -l 4028
```

#### Option C: Docker Deployment

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
RUN npm install -g serve
EXPOSE 4028
CMD ["serve", "-s", "dist", "-l", "4028"]
```

Build and run:
```bash
docker build -t ai-communication-scorer .
docker run -p 4028:4028 ai-communication-scorer
```

---

## Troubleshooting

### Issue 1: Port Already in Use

**Error:** `Port 4028 is already in use`

**Solution:**
```bash
# macOS/Linux - Kill process on port
lsof -ti:4028 | xargs kill -9

# Windows
netstat -ano | findstr :4028
taskkill /PID <PID> /F

# Or change port in vite.config.mjs
```

### Issue 2: npm install fails

**Error:** `EACCES: permission denied`

**Solution:**
```bash
# macOS/Linux - Fix npm permissions
sudo chown -R $USER:$GROUP ~/.npm
sudo chown -R $USER:$GROUP ~/.config

# Windows - Run as Administrator
```

### Issue 3: Module not found errors

**Error:** `Cannot find module 'react'`

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Issue 4: Vite optimization errors

**Error:** Dependencies optimization errors

**Solution:**
```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm start
```

### Issue 5: White screen / Blank page

**Possible Causes:**
1. JavaScript errors - Check browser console (F12)
2. Routing issues - Ensure you're at `http://localhost:4028`
3. Build errors - Check terminal for error messages

**Solution:**
```bash
# Restart dev server
Ctrl+C  # Stop server
npm start  # Restart
```

### Issue 6: API Key not working

**Symptoms:** AI features showing fallback data

**Solution:**
1. Verify `.env` file exists in project root
2. Check API key is correctly formatted: `VITE_HUGGINGFACE_API_KEY=hf_...`
3. Restart development server after changing `.env`
4. Test API key at [https://huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)

### Issue 7: PDF Export not working

**Error:** `autoTable is not a function`

**Solution:**
```bash
# Reinstall PDF dependencies
npm uninstall jspdf jspdf-autotable
npm install jspdf jspdf-autotable
```

---

## Performance Optimization

### For Development

1. **Enable Hot Module Replacement (HMR)** - Already configured in Vite
2. **Use React DevTools** for debugging
3. **Check Network tab** for slow API calls

### For Production

1. **Enable Gzip compression** on web server
2. **Set cache headers** for static assets
3. **Use CDN** for faster asset delivery
4. **Enable service workers** for offline support

---

## Security Considerations

### Environment Variables
- ✅ Never commit `.env` file to version control
- ✅ Add `.env` to `.gitignore`
- ✅ Use different API keys for development and production

### API Keys
- ✅ Rotate API keys periodically
- ✅ Monitor API usage on Hugging Face dashboard
- ✅ Set rate limits if available

### HTTPS
- ✅ Use HTTPS in production
- ✅ Redirect HTTP to HTTPS
- ✅ Enable HSTS headers

---

## Maintenance

### Regular Updates

```bash
# Check for outdated packages
npm outdated

# Update dependencies
npm update

# Update to latest versions (careful!)
npm install <package>@latest
```

### Monitoring

1. Check browser console for errors
2. Monitor API usage on Hugging Face
3. Review application logs
4. Test all features after updates

### Backup

Regularly backup:
- `.env` file (securely)
- Custom configurations
- User data (if stored locally)

---

## Getting Help

### Check Logs
```bash
# Browser console (F12 in browser)
# Terminal output where npm start is running
```

### Common Resources
- Node.js docs: [https://nodejs.org/docs/](https://nodejs.org/docs/)
- React docs: [https://react.dev/](https://react.dev/)
- Vite docs: [https://vitejs.dev/](https://vitejs.dev/)
- Hugging Face docs: [https://huggingface.co/docs](https://huggingface.co/docs)

---

## Quick Reference Commands

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Preview production build
npm run serve

# Clear cache and reinstall
rm -rf node_modules package-lock.json && npm install

# Stop server
Ctrl+C (in terminal where server is running)
```

---

**Deployment Complete! 🎉**

Your AI Communication Scorer should now be running successfully on your local server.
