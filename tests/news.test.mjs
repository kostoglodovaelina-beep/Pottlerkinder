import assert from "node:assert/strict"
import test from "node:test"
import { NEWS_POSTS, filterNews, formatNewsDate } from "../src/lib/news.ts"

test("the launch article has a stable detail URL without a test label", () => {
  assert.equal(NEWS_POSTS.length, 1)
  const article = NEWS_POSTS[0]
  assert.equal("isTest" in article, false)
  assert.equal(article.category, "Neuigkeiten")
  assert.match(article.slug, /^[a-z0-9-]+$/)
  assert.ok(article.sections.length >= 3)
  assert.equal(
    new Set(article.sections.map((section) => section.id)).size,
    article.sections.length,
  )
})

test("news category and search filters combine without changing the source data", () => {
  const original = NEWS_POSTS.slice()
  assert.equal(filterNews(NEWS_POSTS, "Alle", "").length, 1)
  assert.equal(filterNews(NEWS_POSTS, "Presse", "").length, 0)
  assert.equal(filterNews(NEWS_POSTS, "Neuigkeiten", "  ONLINESHOP ").length, 1)
  assert.equal(filterNews(NEWS_POSTS, "Alle", "glück").length, 1)
  assert.equal(filterNews(NEWS_POSTS, "Presse", "Shop").length, 0)
  assert.equal(filterNews(NEWS_POSTS, "Alle", "unbekannte Meldung").length, 0)
  assert.deepEqual(NEWS_POSTS, original)
})

test("news dates use German formatting without time-zone day shifts", () => {
  assert.equal(formatNewsDate("2026-11-04"), "4. November 2026")
})
