import { mkdir, readdir, writeFile } from 'fs/promises';
import { compileFromFile } from 'json-schema-to-typescript';
import path from 'path';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import * as chalk from '@/scripts/lib/logWithColor';

/**
 * Converts JSONSchema files to OpenAPI schema files. Without this, fields like
 * `$schema` and `$id`, which are useful in pure JSONSchema, cause OpenAPI to
 * throw validation errors.
 */
async function convertAllSchemasWithJson2Ts({
  srcDir,
  outDir,
  quiet = false,
}: {
  srcDir: string;
  outDir: string;
  quiet: boolean;
}): Promise<void> {
  const entries = await readdir(srcDir, { withFileTypes: true });

  await mkdir(outDir, { recursive: true });

  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(outDir, entry.name.replace(/.json/, '.ts'));

    if (entry.isDirectory()) {
      await convertAllSchemasWithJson2Ts({
        srcDir: srcPath,
        outDir: path.join(outDir, entry.name),
        quiet,
      });
    } else if (entry.isFile() && entry.name.endsWith('.json')) {
      if (!quiet) {
        console.log(`  json2ts: converting [${srcPath}] to [${destPath}]`);
      }
      const outTs = await compileFromFile(srcPath, {
        bannerComment: '\n',
        // make them human readable
        format: true,
        // other tools use paths relative to the base jsonschema files
        cwd: entry.parentPath,
        declareExternallyReferenced: false,
      });

      await mkdir(path.dirname(destPath), { recursive: true });
      await writeFile(destPath, outTs);
    }
  }
}

const argv = yargs(hideBin(process.argv))
  .option('srcDir', {
    type: 'string',
    demandOption: true,
    describe: 'Source directory',
  })
  .option('outDir', {
    type: 'string',
    demandOption: true,
    describe: 'Output directory',
  })
  .option('quiet', {
    type: 'boolean',
    default: true,
    describe: 'Suppress output',
  })
  .strict()
  .help()
  .parseSync();

chalk.printHeader('  ☀️  ⏳ Generating json2ts typescript libraries...');
console.log('');
console.log('  This takes our JSONSchema ground-truth type definitions and');
console.log('  generates familiar, human-readable typescript types like we');
console.log('  know and love.');
console.log('');

convertAllSchemasWithJson2Ts(argv);

chalk.printHeader('  ☀️  ✅ Done!');
