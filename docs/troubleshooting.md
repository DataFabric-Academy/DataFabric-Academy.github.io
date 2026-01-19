# Troubleshooting Guide

## 🔧 Common Issues and Solutions

### Issue 1: Port 3000 Already in Use

**Error**:
```
[WARNING] Something is already running on port 3000.
Would you like to run the app on another port instead?
```

**Solution**:

**Option 1: Kill the process**
```bash
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with actual process ID)
taskkill /F /PID <PID>
```

**Option 2: Use different port**
```bash
pnpm run start -- --port 3001
```

**Option 3: Use Docusaurus clear command**
```bash
pnpm run clear
pnpm run start
```

---

### Issue 2: Blog Metadata Error

**Error**:
```
ERROR in ./.docusaurus/registry.js
Module not found: Error: Can't resolve '~blog/default/blogMetadata-default.json'
```

**Solution**:

**Step 1: Clear all caches**
```bash
# Clear Docusaurus cache
pnpm run clear

# Remove .docusaurus folder manually
Remove-Item -Recurse -Force .docusaurus

# Remove build folder
Remove-Item -Recurse -Force build
```

**Step 2: Verify blog configuration**

Check `docusaurus.config.ts`:
```typescript
blog: {
  showReadingTime: true,
  feedOptions: {
    type: 'all',
    copyright: `Copyright © ${new Date().getFullYear()} DataFabric Academy.`,
  },
},
```

**Step 3: Verify blog folder structure**

```
blog/
├── authors.yml
├── tags.yml
├── 2019-05-28-first-blog-post.md
├── 2019-05-29-long-blog-post.md
└── 2021-08-01-mdx-blog-post.mdx
```

**Step 4: Verify authors.yml format**

```yaml
author-name:
  name: Author Name
  title: Author Title
  url: https://example.com
  image_url: https://example.com/image.png
```

**Step 5: Rebuild**
```bash
pnpm run start
```

**If still fails**:
- Check blog post frontmatter format
- Verify all authors in blog posts exist in `authors.yml`
- Try disabling blog temporarily: `blog: false` in config

---

### Issue 3: Sync Script Not Working

**Error**: Sync script doesn't detect changes or fails to sync

**Solution**:

**Step 1: Verify Vault Path**
```bash
# Check if vault exists
Test-Path "D:\Obsidian\Knowledge-Fabric-Vault\90_Academy"

# Or set custom path
$env:OBSIDIAN_VAULT="D:\Your\Vault\Path"
pnpm run sync
```

**Step 2: Check Permissions**
- Verify read permissions on Obsidian Vault
- Verify write permissions on Docusaurus repo

**Step 3: Manual Sync**
```bash
# One-time sync
pnpm run sync

# Check output for errors
```

**Step 4: Restart Watch Mode**
```bash
# Stop watch mode (Ctrl+C)
# Restart
pnpm run sync:watch
```

---

### Issue 4: Build Fails

**Error**: `pnpm run build` fails

**Solution**:

**Step 1: Clear cache**
```bash
pnpm run clear
```

**Step 2: Check for broken links**
```bash
# Build with verbose output
pnpm run build -- --verbose
```

**Step 3: Fix broken links**
- Check `onBrokenLinks: 'throw'` in config
- Fix or remove broken links
- Or change to `onBrokenLinks: 'warn'` temporarily

**Step 4: Check dependencies**
```bash
# Reinstall dependencies
rm -rf node_modules
pnpm install
```

---

### Issue 5: Dev Server Not Reloading

**Error**: Changes in Obsidian don't reflect in browser

**Solution**:

**Step 1: Verify sync script is running**
```bash
# Terminal 1: Watch mode
pnpm run sync:watch
```

**Step 2: Verify dev server is running**
```bash
# Terminal 2: Dev server
pnpm run start
```

**Step 3: Check file sync**
- Verify files are synced to `docs/` folders
- Check terminal 1 for sync messages
- Check terminal 2 for reload messages

**Step 4: Manual refresh**
- Hard refresh browser (Ctrl+Shift+R / Cmd+Shift+R)
- Or restart dev server

---

### Issue 6: Images Not Loading

**Error**: Images don't display in Docusaurus

**Solution**:

**Step 1: Verify image paths**
- Use absolute paths: `/assets/image.png`
- Or relative paths: `../assets/image.png`

**Step 2: Verify assets are synced**
```bash
# Check static/assets folder
ls static/assets/
```

**Step 3: Sync assets manually**
```bash
pnpm run sync
```

**Step 4: Check image format**
- Supported: `.png`, `.jpg`, `.jpeg`, `.gif`, `.svg`
- Verify file extensions are correct

---

## 🛠️ Quick Fixes

### Clear Everything and Rebuild

```bash
# Clear all caches
pnpm run clear
Remove-Item -Recurse -Force .docusaurus -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force build -ErrorAction SilentlyContinue

# Reinstall dependencies (if needed)
pnpm install

# Rebuild
pnpm run build
```

### Reset Dev Environment

```bash
# Stop all processes
# Kill processes on port 3000

# Clear caches
pnpm run clear

# Restart
pnpm run sync:watch  # Terminal 1
pnpm run start       # Terminal 2
```

---

## 📋 Diagnostic Checklist

When troubleshooting, check:

- [ ] Port 3000 is available
- [ ] All caches are cleared
- [ ] Dependencies are installed (`pnpm install`)
- [ ] Vault path is correct
- [ ] File permissions are correct
- [ ] Blog configuration is valid
- [ ] Authors.yml format is correct
- [ ] No broken links in content
- [ ] Build succeeds locally

---

## 🔗 Related Documentation

- [Development Workflow](development-workflow.md) - How to run dev server
- [Obsidian Sync Test](obsidian-sync-test.md) - Sync script testing
- [Deployment Guide](deployment.md) - Production deployment

---

**Last Updated**: 2026-01-19
