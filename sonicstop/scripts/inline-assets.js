import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = join(__dirname, '..', 'dist')
const cssDir = join(distDir, 'css')

if (existsSync(cssDir)) {
  const cssFiles = readdirSync(cssDir).filter(f => f.endsWith('.css'))
  cssFiles.forEach(cssFile => {
    const filePath = join(cssDir, cssFile)
    let css = readFileSync(filePath, 'utf-8')
    css = css.replaceAll('./assets/', '../assets/')
    writeFileSync(filePath, css)
  })
}

const htmlFiles = readdirSync(distDir).filter(f => f.endsWith('.html'))

htmlFiles.forEach(htmlFile => {
  const filePath = join(distDir, htmlFile)
  let html = readFileSync(filePath, 'utf-8')

  html = html.replace(/<link rel="modulepreload"[^>]*>\s*/g, '')

  html = html.replace(/\s+crossorigin(?:="[^"]*")?/g, '')

  html = html.replace(/ type="module"/g, ' defer')

  writeFileSync(filePath, html)
})

