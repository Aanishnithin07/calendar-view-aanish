#!/bin/bash

# =============================================================================
# Calendar Component Library - Setup Commands Reference
# Phase 1: Project Scaffolding Complete
# =============================================================================

# This file documents all the shell commands used to create the project structure.
# You can use these commands as reference for future similar projects.

# -----------------------------------------------------------------------------
# 1. PROJECT INITIALIZATION
# -----------------------------------------------------------------------------

# Create Vite project with React + TypeScript template
npm create vite@latest . -- --template react-ts

# Install dependencies
npm install

# -----------------------------------------------------------------------------
# 2. INSTALL TAILWIND CSS
# -----------------------------------------------------------------------------

# Install Tailwind CSS and dependencies
npm install -D tailwindcss postcss autoprefixer @tailwindcss/postcss

# -----------------------------------------------------------------------------
# 3. CREATE FOLDER STRUCTURE
# -----------------------------------------------------------------------------

# Create all required folders in src/
mkdir -p src/components/Calendar
mkdir -p src/components/primitives
mkdir -p src/hooks
mkdir -p src/utils
mkdir -p src/types
mkdir -p src/styles

# Alternative: Create all in one command
mkdir -p src/{components/{Calendar,primitives},hooks,utils,types,styles}

# -----------------------------------------------------------------------------
# 4. VERIFY FOLDER STRUCTURE
# -----------------------------------------------------------------------------

# List the created structure
tree src -L 2

# Or use ls
ls -R src/

# -----------------------------------------------------------------------------
# 5. DEVELOPMENT COMMANDS
# -----------------------------------------------------------------------------

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type check only (no build)
npx tsc --noEmit

# -----------------------------------------------------------------------------
# 6. UTILITIES
# -----------------------------------------------------------------------------

# Check TypeScript version
npx tsc --version

# Check Node version
node --version

# Check npm version
npm --version

# View installed packages
npm list --depth=0

# -----------------------------------------------------------------------------
# 7. FILE CREATION REFERENCE
# -----------------------------------------------------------------------------

# The following files were created manually (or via AI):
# 
# src/
# ├── components/
# │   ├── Calendar/
# │   │   ├── CalendarView.tsx
# │   │   ├── MonthView.tsx
# │   │   ├── WeekView.tsx
# │   │   ├── CalendarCell.tsx
# │   │   └── index.ts
# │   └── primitives/
# │       ├── Button.tsx
# │       ├── Modal.tsx
# │       ├── Select.tsx
# │       └── index.ts
# ├── hooks/
# │   ├── useCalendar.ts
# │   ├── useEventManager.ts
# │   └── index.ts
# ├── utils/
# │   ├── date.utils.ts
# │   └── event.utils.ts
# ├── types/
# │   └── calendar.types.ts
# └── styles/
#     └── globals.css
#
# Configuration files:
# ├── tailwind.config.js
# ├── postcss.config.js
# ├── vite.config.ts
# └── tsconfig.app.json (modified)

# -----------------------------------------------------------------------------
# 8. PACKAGE.JSON SCRIPTS
# -----------------------------------------------------------------------------

# Available scripts from package.json:
# npm run dev       - Start development server
# npm run build     - Build for production
# npm run preview   - Preview production build
# npm run lint      - Run ESLint

# -----------------------------------------------------------------------------
# 9. GIT COMMANDS (if using version control)
# -----------------------------------------------------------------------------

# Initialize git repository
git init

# Add all files
git add .

# Commit
git commit -m "Phase 1: Initial calendar component library setup"

# -----------------------------------------------------------------------------
# 10. TROUBLESHOOTING
# -----------------------------------------------------------------------------

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite

# Clear build output
rm -rf dist

# -----------------------------------------------------------------------------
# NOTES
# -----------------------------------------------------------------------------

# - All paths use forward slashes (/) for cross-platform compatibility
# - TypeScript strict mode is enabled in tsconfig.app.json
# - Path aliases (@/) are configured in both tsconfig and vite.config
# - No external UI libraries - all primitives are custom built
# - Tailwind CSS v4 with @tailwindcss/postcss plugin

# =============================================================================
# END OF SETUP COMMANDS
# =============================================================================
