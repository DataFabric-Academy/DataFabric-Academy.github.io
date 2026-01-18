const fs = require('fs-extra');
const path = require('path');
const chokidar = require('chokidar'); // สำหรับ watch mode

// Configuration
const VAULT_ROOT = process.env.OBSIDIAN_VAULT || 'D:\\Obsidian\\Knowledge-Fabric-Vault';
const REPO_ROOT = path.resolve(__dirname, '..');

// Sync configurations สำหรับแต่ละ docs instance (Multi-instance structure)
const syncConfigs = [
  {
    name: 'main-portal',
    source: path.join(VAULT_ROOT, '90_Academy', 'main-portal'),
    dest: path.join(REPO_ROOT, 'docs'),
    assetsSource: path.join(VAULT_ROOT, '90_Academy', '_assets'),
    assetsDest: path.join(REPO_ROOT, 'static', 'assets'),
  },
  {
    name: 'course-n8n',
    source: path.join(VAULT_ROOT, '90_Academy', 'course-n8n'),
    dest: path.join(REPO_ROOT, 'docs-n8n'),
    assetsSource: path.join(VAULT_ROOT, '90_Academy', '_assets'),
    assetsDest: path.join(REPO_ROOT, 'static', 'assets'),
  },
  {
    name: 'course-power-bi',
    source: path.join(VAULT_ROOT, '90_Academy', 'course-power-bi'),
    dest: path.join(REPO_ROOT, 'docs-power-bi'),
    assetsSource: path.join(VAULT_ROOT, '90_Academy', '_assets'),
    assetsDest: path.join(REPO_ROOT, 'static', 'assets'),
  },
  {
    name: 'course-ms-sql',
    source: path.join(VAULT_ROOT, '90_Academy', 'course-ms-sql'),
    dest: path.join(REPO_ROOT, 'docs-ms-sql'),
    assetsSource: path.join(VAULT_ROOT, '90_Academy', '_assets'),
    assetsDest: path.join(REPO_ROOT, 'static', 'assets'),
  },
];

/**
 * Copy files from source to destination
 * @param {string} source - Source directory
 * @param {string} dest - Destination directory
 * @param {object} options - Copy options
 */
async function copyFiles(source, dest, options = {}) {
  if (!await fs.pathExists(source)) {
    console.warn(`⚠️  Source path does not exist: ${source}`);
    return;
  }

  await fs.ensureDir(dest);

  await fs.copy(source, dest, {
    overwrite: true,
    filter: (src) => {
      // Skip node_modules, .git, and other system files
      const relativePath = path.relative(source, src);
      if (relativePath.includes('node_modules') || 
          relativePath.includes('.git') ||
          relativePath.includes('.obsidian')) {
        return false;
      }
      // Copy .md files and assets
      return true;
    },
    ...options,
  });
}

/**
 * Convert Obsidian Wiki Links to Markdown links (optional)
 * @param {string} content - File content
 * @returns {string} - Converted content
 */
function convertWikiLinks(content) {
  // Convert [[link]] to [link](link.md)
  // This is optional - you can skip if using standard markdown links
  return content.replace(/\[\[([^\]]+)\]\]/g, (match, link) => {
    const cleanLink = link.split('|')[0]; // Handle [[link|display text]]
    return `[${cleanLink}](${cleanLink.replace(/\s+/g, '-').toLowerCase()}.md)`;
  });
}

/**
 * Sync content and assets for a single site
 */
async function syncSite(config) {
  console.log(`\n📦 Syncing ${config.name}...`);

  // Sync content files
  if (await fs.pathExists(config.source)) {
    await copyFiles(config.source, config.dest);
    console.log(`  ✓ Content: ${config.source} → ${config.dest}`);
  } else {
    console.warn(`  ⚠️  Content source not found: ${config.source}`);
  }

  // Sync assets
  if (await fs.pathExists(config.assetsSource)) {
    await copyFiles(config.assetsSource, config.assetsDest);
    console.log(`  ✓ Assets: ${config.assetsSource} → ${config.assetsDest}`);
  }

  console.log(`  ✅ ${config.name} sync complete\n`);
}

/**
 * Sync all sites
 */
async function syncAll() {
  console.log('🚀 Starting sync from Obsidian Vault to Docusaurus site...\n');
  console.log(`Vault: ${VAULT_ROOT}`);
  console.log(`Repo: ${REPO_ROOT}\n`);

  for (const config of syncConfigs) {
    await syncSite(config);
  }

  console.log('✨ All content synced successfully!');
}

/**
 * Watch mode - auto-sync on file changes
 */
function watchMode() {
  console.log('👀 Watch mode enabled - watching for file changes...\n');

  const watchPaths = syncConfigs.map(config => [
    config.source,
    config.assetsSource,
  ]).flat().filter(p => fs.pathExistsSync(p));

  const watcher = chokidar.watch(watchPaths, {
    ignored: /(^|[\/\\])\../, // Ignore dotfiles
    persistent: true,
  });

  watcher.on('change', async (filePath) => {
    console.log(`\n📝 File changed: ${filePath}`);
    
    // Find which config this file belongs to
    const config = syncConfigs.find(c => 
      filePath.startsWith(c.source) || filePath.startsWith(c.assetsSource)
    );

    if (config) {
      await syncSite(config);
    }
  });

  console.log(`Watching ${watchPaths.length} paths...\n`);
}

// Main execution
const args = process.argv.slice(2);
const isWatchMode = args.includes('--watch');

if (isWatchMode) {
  syncAll().then(() => watchMode());
} else {
  syncAll().catch(console.error);
}