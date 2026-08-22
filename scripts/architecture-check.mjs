import { readdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const sourceRoot = resolve('src');
const layerPatterns = [
  {
    layer: 'domain',
    directory: 'domain',
    forbidden: ['application', 'adapters'],
  },
  {
    layer: 'application',
    directory: 'application',
    forbidden: ['adapters'],
  },
];

async function listTypeScriptFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const path = resolve(directory, entry.name);
      if (entry.isDirectory()) {
        return listTypeScriptFiles(path);
      }

      return entry.isFile() && entry.name.endsWith('.ts') ? [path] : [];
    }),
  );

  return files.flat();
}

function forbiddenImportIsPresent(content, forbiddenLayer) {
  const pattern = new RegExp(`from\\s+['"][^'"]*${forbiddenLayer}[^'"]*['"]`);
  return pattern.test(content);
}

async function findViolations() {
  const violations = [];

  for (const policy of layerPatterns) {
    const directory = resolve(sourceRoot, policy.directory);
    const files = await listTypeScriptFiles(directory);

    for (const file of files) {
      const content = await readFile(file, 'utf8');
      for (const forbiddenLayer of policy.forbidden) {
        if (forbiddenImportIsPresent(content, forbiddenLayer)) {
          violations.push(`${file} imports forbidden ${forbiddenLayer} layer`);
        }
      }
    }
  }

  return violations;
}

const violations = await findViolations();

if (violations.length > 0) {
  for (const violation of violations) {
    process.stderr.write(`ARCHITECTURE_VIOLATION: ${violation}\n`);
  }
  process.exitCode = 1;
} else {
  process.stdout.write('Architecture boundary check passed.\n');
}
