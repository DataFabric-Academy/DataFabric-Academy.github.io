const fs = require('fs-extra');
const path = require('path');
const chokidar = require('chokidar');

// Configuration
const VAULT_ROOT = process.env.OBSIDIAN_VAULT || 'D:\\Obsidian\\Knowledge-Fabric-Vault';
const REPO_ROOT = path.resolve(__dirname, '..');
const ACADEMY_PATH = path.join(VAULT_ROOT, '90_Academy');
const ASSETS_SOURCE = path.join(ACADEMY_PATH, '_assets');
const ASSETS_DEST = path.join(REPO_ROOT, 'static', 'assets');

// Course configurations
const COURSES = ['main-portal', 'course-n8n', 'course-power-bi', 'course-ms-sql'];
const DOCS_MAP = {
  'main-portal': 'docs',
  'course-n8n': 'docs-n8n',
  'course-power-bi': 'docs-power-bi',
  'course-ms-sql': 'docs-ms-sql',
};

// Generate sync configurations
const syncConfigs = COURSES.map((name) => ({
  name,
  source: path.join(ACADEMY_PATH, name),
  dest: path.join(REPO_ROOT, DOCS_MAP[name]),
  assetsSource: ASSETS_SOURCE,
  assetsDest: ASSETS_DEST,
}));

/**
 * Copy files from source to destination with filtering.
 * @param {string} source - Source directory
 * @param {string} dest - Destination directory
 * @returns {Promise<void>}
 */
async function copyFiles(source, dest, options = {}) {
  if (!(await fs.pathExists(source))) {
    console.warn(`⚠️  Source path does not exist: ${source}`);
    return;
  }

  try {
    await fs.ensureDir(dest);

    await fs.copy(source, dest, {
      overwrite: true,
      filter: (src) => {
        const relativePath = path.relative(source, src);
        const ignoredPatterns = ['node_modules', '.git', '.obsidian', '.DS_Store', 'Thumbs.db'];
        
        // Exclude attachments folder if option is set (will be synced separately)
        if (options.excludeAttachments && relativePath.includes('attachments')) {
          return false;
        }
        
        return !ignoredPatterns.some((pattern) => relativePath.includes(pattern));
      },
    });
  } catch (error) {
    console.error(`❌ Error copying ${source} to ${dest}:`, error.message);
    throw error;
  }
}

/**
 * Sync attachments from a source folder to assets destination.
 * @param {string} attachmentsSource - Source attachments folder
 * @param {string} assetsDest - Destination assets folder
 * @param {string} courseName - Course name for organization
 * @returns {Promise<void>}
 */
async function syncAttachments(attachmentsSource, assetsDest, courseName) {
  if (!(await fs.pathExists(attachmentsSource))) {
    return; // No attachments folder, skip
  }

  const courseAssetsDest = path.join(assetsDest, courseName);
  await fs.ensureDir(courseAssetsDest);
  await copyFiles(attachmentsSource, courseAssetsDest);
  console.log(`  ✓ Attachments: ${path.basename(attachmentsSource)} → assets/${courseName}`);
}

/**
 * Sync content and assets for a single site.
 * @param {object} config - Sync configuration
 * @returns {Promise<void>}
 */
async function syncSite(config) {
  console.log(`\n📦 Syncing ${config.name}...`);

  try {
    // Sync content files (excluding attachments folder)
    if (await fs.pathExists(config.source)) {
      await copyFiles(config.source, config.dest, {
        excludeAttachments: true,
      });
      console.log(`  ✓ Content: ${path.basename(config.source)} → ${path.basename(config.dest)}`);
    } else {
      console.warn(`  ⚠️  Content source not found: ${config.source}`);
    }

    // Sync attachments folder (if exists) to static/assets/{course-name}
    const attachmentsSource = path.join(config.source, 'attachments');
    if (await fs.pathExists(attachmentsSource)) {
      await syncAttachments(attachmentsSource, ASSETS_DEST, config.name);
    }

    // Sync shared assets (only once, shared across all courses)
    if (config.name === 'main-portal' && (await fs.pathExists(config.assetsSource))) {
      await copyFiles(config.assetsSource, config.assetsDest);
      console.log(`  ✓ Shared assets synced`);
    }

    console.log(`  ✅ ${config.name} sync complete`);
  } catch (error) {
    console.error(`  ❌ Failed to sync ${config.name}:`, error.message);
    throw error;
  }
}

/**
 * Sync all sites.
 * @returns {Promise<void>}
 */
async function syncAll() {
  console.log('🚀 Starting sync from Obsidian Vault to Docusaurus site...\n');
  console.log(`Vault: ${VAULT_ROOT}`);
  console.log(`Repo: ${REPO_ROOT}\n`);

  try {
    for (const config of syncConfigs) {
      await syncSite(config);
    }
    console.log('\n✨ All content synced successfully!');
  } catch (error) {
    console.error('\n❌ Sync failed:', error.message);
    process.exit(1);
  }
}

/**
 * Watch mode - auto-sync on file changes.
 * @returns {void}
 */
function watchMode() {
  console.log('👀 Watch mode enabled - watching for file changes...\n');

  const watchPaths = [
    ...syncConfigs.map((config) => config.source),
    ASSETS_SOURCE,
  ].filter((p) => fs.pathExistsSync(p));

  const watcher = chokidar.watch(watchPaths, {
    ignored: /(^|[\/\\])\../,
    persistent: true,
    ignoreInitial: true,
  });

  watcher.on('change', async (filePath) => {
    console.log(`\n📝 File changed: ${path.basename(filePath)}`);

    const config = syncConfigs.find(
      (c) => filePath.startsWith(c.source) || filePath.startsWith(ASSETS_SOURCE)
    );

    if (config) {
      try {
        await syncSite(config);
      } catch (error) {
        console.error(`  ❌ Sync failed for ${config.name}:`, error.message);
      }
    }
  });

  watcher.on('error', (error) => {
    console.error('❌ Watcher error:', error.message);
  });

  console.log(`Watching ${watchPaths.length} paths...\n`);
  console.log('Press Ctrl+C to stop watching.\n');
}

// Main execution
const args = process.argv.slice(2);
const isWatchMode = args.includes('--watch');

if (isWatchMode) {
  syncAll()
    .then(() => watchMode())
    .catch((error) => {
      console.error('❌ Failed to start watch mode:', error.message);
      process.exit(1);
    });
} else {
  syncAll();
}