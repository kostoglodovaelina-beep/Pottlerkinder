import {
  existsSync,
  globSync,
  readFileSync,
  readdirSync,
  statSync,
} from "node:fs"
import path from "node:path"
import ts from "typescript"

const files = readdirSync("src", { recursive: true })
  .map((file) => path.join("src", file))
  .filter((file) => statSync(file).isFile())
const referenced = new Set()
const missing = []

function resolveLocal(file, specifier) {
  const spec = specifier.split(/[?#]/)[0]
  if (spec.startsWith("@/")) return path.join("src", spec.slice(2))
  if (spec.startsWith("/src/")) return spec.slice(1)
  if (spec.startsWith("/")) return path.join("public", spec.slice(1))
  if (spec.startsWith(".")) return path.join(path.dirname(file), spec)
  return null
}

function reference(file, specifier) {
  const local = resolveLocal(file, specifier)
  if (!local) return
  const resolved = [
    local,
    `${local}.ts`,
    `${local}.tsx`,
    `${local}/index.ts`,
  ].find((candidate) => existsSync(candidate) && statSync(candidate).isFile())
  if (resolved) referenced.add(path.normalize(resolved))
  else missing.push(`${file}: ${specifier}`)
}

for (const file of files.filter((file) => /\.[jt]sx?$/.test(file))) {
  const source = readFileSync(file, "utf8")
  const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true)
  function walk(node) {
    if (
      (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
      node.moduleSpecifier &&
      ts.isStringLiteral(node.moduleSpecifier)
    )
      reference(file, node.moduleSpecifier.text)
    if (
      ts.isCallExpression(node) &&
      node.expression.getText(ast) === "import.meta.glob"
    ) {
      const argument = node.arguments[0]
      if (!ts.isStringLiteral(argument))
        throw new Error(`Unsupported asset glob in ${file}`)
      const pattern = resolveLocal(file, argument.text)
      const matches = globSync(pattern)
      if (!matches.length) missing.push(`${file}: empty glob ${argument.text}`)
      matches.forEach((match) => referenced.add(path.normalize(match)))
    }
    ts.forEachChild(node, walk)
  }
  walk(ast)
}

for (const file of [
  ...files.filter((file) => file.endsWith(".css")),
  "index.html",
]) {
  const source = readFileSync(file, "utf8")
  const pattern = file.endsWith(".css")
    ? /url\(\s*["']?([^"')\s]+)["']?\s*\)/g
    : /(?:src|href)=["']([^"']+)["']/g
  for (const [, specifier] of source.matchAll(pattern)) {
    if (!/^(data:|https?:|#)/.test(specifier))
      reference(
        file,
        specifier.startsWith(".") || specifier.startsWith("/")
          ? specifier
          : `./${specifier}`,
      )
  }
}

const assets = files.filter((file) =>
  /\.(webp|png|jpe?g|svg|woff2|pdf)$/.test(file),
)
const unused = assets.filter((file) => !referenced.has(file))
console.log(JSON.stringify({ assets: assets.length, missing, unused }, null, 2))
if (missing.length) process.exitCode = 1
