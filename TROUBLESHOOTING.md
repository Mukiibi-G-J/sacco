# Troubleshooting Guide

## SWC Binary Issue - FIXED ✅

If you encounter the error:
```
⚠ Attempted to load @next/swc-win32-x64-msvc, but it was not installed
⨯ Failed to load SWC binary for win32/x64
```

### Solution Applied:
1. Cleared node_modules and .next cache
2. Cleaned npm cache
3. Reinstalled all dependencies
4. Explicitly installed the SWC binary package: `@next/swc-win32-x64-msvc`

### The fix is already applied in your project.

The SWC package has been installed and should now work properly. Try running:
```bash
npm run dev
```

---

## Port Already in Use

If port 3000 is in use, Next.js will automatically try the next available port (3001, 3002, etc.). This is normal behavior.

To use a specific port, you can modify the dev script in `package.json`:
```json
"dev": "next dev -p 3000"
```

Or kill the process using port 3000:
```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with the process ID)
taskkill /PID <PID> /F
```

---

## Common Issues and Solutions

### Issue: Module not found errors
**Solution**: Make sure all dependencies are installed:
```bash
npm install
```

### Issue: TypeScript errors
**Solution**: Check that TypeScript is installed:
```bash
npm install -D typescript @types/react @types/node
```

### Issue: Tailwind CSS not working
**Solution**: Verify Tailwind is configured in `tailwind.config.ts` and check that `globals.css` imports Tailwind directives.

### Issue: Path aliases not working
**Solution**: Verify `tsconfig.json` has the correct paths configuration:
```json
"paths": {
  "@/*": ["./*"]
}
```

---

## Development Server

To start the development server:
```bash
npm run dev
```

The server will start on:
- http://localhost:3000 (or next available port)

Available pages:
- Login: http://localhost:3000/login
- Dashboard: http://localhost:3000/dashboard

---

## Build Issues

If you encounter build issues:

1. Clear cache and rebuild:
   ```bash
   rm -r -fo node_modules, .next
   npm install
   npm run build
   ```

2. Check for TypeScript errors:
   ```bash
   npm run lint
   ```

3. Verify all imports are correct and files exist.

