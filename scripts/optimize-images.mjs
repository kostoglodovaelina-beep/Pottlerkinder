import { readdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import sharp from "sharp"

// No resizing/cropping: constructor print zones depend on the original framing.
const write = process.argv.includes("--write")
const root = "src/assets"
const files = (await readdir(root, { recursive: true }))
  .filter((file) => file.endsWith(".webp"))
  .map((file) => path.join(root, file))
const summary = { scanned: files.length, optimized: 0, before: 0, after: 0 }
let cursor = 0

await Promise.all(
  Array.from({ length: 4 }, async () => {
    while (cursor < files.length) {
      const file = files[cursor++]
      const original = await readFile(file)
      const { width, height } = await sharp(original).metadata()
      const compressed = await sharp(original)
        .webp({ quality: 82, alphaQuality: 100, effort: 6 })
        .toBuffer()
      // Keep existing files when the gain does not justify another encoding.
      const worthwhile = compressed.length < original.length * 0.9
      summary.before += original.length
      summary.after += worthwhile ? compressed.length : original.length
      if (!worthwhile) continue
      const metadata = await sharp(compressed).metadata()
      if (metadata.width !== width || metadata.height !== height)
        throw new Error(`Image dimensions changed: ${file}`)
      if (write) await writeFile(file, compressed)
      summary.optimized++
    }
  }),
)
console.log(
  JSON.stringify({ mode: write ? "write" : "dry-run", ...summary }, null, 2),
)
