// Generates a single static JSON asset (public/search/content-index.json) mapping each
// topic markdown file's relative path -> raw text, so the browser fetches ONE file for
// full-text search instead of ~4,200 separate module chunks (measured: 18-30s vs <1s).
// Run automatically via the "predev"/"prebuild" npm scripts; safe to re-run any time.
import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises'
import { join, relative, extname } from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = fileURLToPath(new URL('.', import.meta.url))
const contentRoot = join(scriptDir, '..', 'src', 'features', 'main', 'content')
const outputPath = join(scriptDir, '..', 'public', 'search', 'content-index.json')

async function collectMarkdownFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = join(dir, entry.name)
      if (entry.isDirectory()) {
        return collectMarkdownFiles(fullPath)
      }
      return extname(entry.name) === '.md' ? [fullPath] : []
    }),
  )
  return files.flat()
}

async function main() {
  const markdownFiles = await collectMarkdownFiles(contentRoot)
  const index = {}

  for (const filePath of markdownFiles) {
    const key = relative(contentRoot, filePath).split('\\').join('/')
    index[key] = await readFile(filePath, 'utf-8')
  }

  await mkdir(join(scriptDir, '..', 'public', 'search'), { recursive: true })
  await writeFile(outputPath, JSON.stringify(index), 'utf-8')

  console.log(`Generated search content index: ${markdownFiles.length} files -> ${outputPath}`)
}

main().catch((error) => {
  console.error('Failed to generate search content index:', error)
  process.exitCode = 1
})
