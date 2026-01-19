# Deployment Guide

## 📋 Overview

This guide covers deployment to GitHub Pages, troubleshooting, and setup instructions.

---

## 🚀 Quick Start

### First Time Setup

1. **Create GitHub Repository**
   - Name: `DataFabric-Academy.github.io`
   - Organization: `DataFabric-Academy`
   - Visibility: Public

2. **Push Code**
   ```bash
   git remote add origin https://github.com/DataFabric-Academy/DataFabric-Academy.github.io.git
   git push -u origin master
   ```

3. **Configure GitHub Pages**
   - Go to **Settings** → **Pages**
   - Set **Source** to **GitHub Actions**
   - Wait 2-5 minutes for deployment

### Regular Deployment

```bash
# Sync content from Obsidian Vault
pnpm run sync

# Commit and push
git add .
git commit -m "docs: update content"
git push origin master
```

GitHub Actions will automatically build and deploy.

---

## ⚙️ Configuration

### GitHub Pages Settings

**URL**: https://github.com/DataFabric-Academy/DataFabric-Academy.github.io/settings/pages

- **Source**: `GitHub Actions` ✅
- **Custom Domain** (optional): `datafabric.academy`

### GitHub Actions Workflow

**File**: `.github/workflows/deploy.yml`

**Triggers**:
- Push to `main` or `master` branch
- Manual trigger via `workflow_dispatch`

**Process**:
1. Install dependencies (`pnpm install`)
2. Build Docusaurus site (`pnpm run build`)
3. Deploy to GitHub Pages

### URLs

- **Main Portal**: https://DataFabric-Academy.github.io
- **Custom Domain**: https://datafabric.academy
- **Course n8n**: https://DataFabric-Academy.github.io/course-n8n/
- **Course Power BI**: https://DataFabric-Academy.github.io/course-power-bi/
- **Course MS SQL**: https://DataFabric-Academy.github.io/course-ms-sql/

---

## 🔍 Diagnostic Checklist

### 1. GitHub Actions Workflow

**URL**: https://github.com/DataFabric-Academy/DataFabric-Academy.github.io/actions

- [ ] Check latest workflow run has ✅ green checkmark
- [ ] Verify "Deploy to GitHub Pages" step succeeded
- [ ] Check logs for errors

**If workflow fails:**
- Check error messages in logs
- Verify build succeeded
- Check permissions

### 2. GitHub Pages Settings

**URL**: https://github.com/DataFabric-Academy/DataFabric-Academy.github.io/settings/pages

- [ ] **Source** is set to `GitHub Actions` ✅
- [ ] **Active deployments** are visible
- [ ] URL shows: `https://DataFabric-Academy.github.io`

**If Source is not GitHub Actions:**
- Change to "GitHub Actions"
- Click "Save"
- Wait 2-5 minutes

### 3. Workflow Permissions

**URL**: https://github.com/DataFabric-Academy/DataFabric-Academy.github.io/settings/actions

- [ ] **Workflow permissions** = "Read and write permissions" ✅
- [ ] If greyed out, check Organization Settings

**Organization Settings:**
- URL: https://github.com/organizations/DataFabric-Academy/settings/actions
- Set **Workflow permissions** = "Read and write permissions"
- Save and return to repository settings

### 4. Environment Protection Rules

**URL**: https://github.com/DataFabric-Academy/DataFabric-Academy.github.io/settings/environments

- [ ] Go to `github-pages` environment
- [ ] In "Deployment branches":
  - Select "Selected branches"
  - Add `master` (and `main` if exists)
  - Or select "All branches"
- [ ] Save

### 5. URL Testing

- [ ] https://DataFabric-Academy.github.io
- [ ] https://datafabric.academy (if custom domain configured)

**If still 404:**
- Wait 2-5 minutes after successful deployment
- Hard refresh (Ctrl+Shift+R / Cmd+Shift+R)
- Try Incognito/Private mode
- Check browser console (F12) for errors

---

## 🛠️ Troubleshooting

### Workflow Not Running

**Symptoms**: No workflow appears in Actions tab

**Solutions**:
- Verify `.github/workflows/deploy.yml` is pushed to repository
- Check branch is `main` or `master`
- Manually trigger: Actions → "Build and Deploy Sites" → "Run workflow"

### Build Fails

**Symptoms**: Workflow shows ❌ red X

**Solutions**:
- Check logs in Actions tab
- Verify `package.json` and `pnpm-lock.yaml` are correct
- Check for broken links: `onBrokenLinks: 'throw'` in config
- Run `pnpm run build` locally to reproduce

### Deployment Fails

**Symptoms**: Build succeeds but deployment fails

**Solutions**:
- Verify **Settings** → **Pages** → **Source** = "GitHub Actions"
- Check `GITHUB_TOKEN` permissions
- Verify environment `github-pages` allows deployment from `master` branch
- Check workflow logs for specific error messages

### Page Shows 404

**Symptoms**: Workflow succeeds but page is 404

**Solutions**:
- Wait 5-10 minutes (GitHub Pages propagation time)
- Verify `baseUrl: '/'` in `docusaurus.config.ts`
- Check `projectName` matches repository name exactly (case-sensitive)
- Verify custom domain DNS settings (if used)
- Check for environment protection rules blocking deployment

### Permissions Greyed Out

**Symptoms**: Cannot select "Read and write permissions"

**Solutions**:
- Check Organization-level settings
- Go to: https://github.com/organizations/DataFabric-Academy/settings/actions
- Set Organization **Workflow permissions** = "Read and write permissions"
- Return to repository settings

---

## 📚 Additional Resources

- [Docusaurus Deployment Guide](https://docusaurus.io/docs/deployment)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

---

**Last Updated**: 2026-01-19
