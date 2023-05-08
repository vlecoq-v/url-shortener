import Express from 'express'
import { Url } from '@prisma/client'
// import { createHash } from 'crypto'
import Cache from 'node-cache'
import { getUrl, upsertUrl } from './url'
import { createHash } from 'crypto'

const app = Express()
app.use(Express.json())

// SLUG AND CACHE 

const MAX_CACHE_ENTRIES = 100
const pathSlugCache = new Cache({
  stdTTL: 60 * 60, // 1 hour
  checkperiod: 120, // check for expired entries every 2 minutes
  deleteOnExpire: true,
  useClones: false,
  maxKeys: MAX_CACHE_ENTRIES,
})

/** get a slug from cache or create one from Hash */
export function getSlug(path: string): string {
  if (pathSlugCache.has(path)) { console.log('have it')
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return pathSlugCache.get(path)! }
  const hash = createHash('sha256')
  const slug = hash.update(path).digest('hex').substring(0, 8)
  pathSlugCache.set(path, slug)
  return slug
}

// ROUTER

app.post<object, Url,{ base_url: string, path: string }, object, object>('/url', async (req, res) => {
	const url = await upsertUrl(req.body.base_url, req.body.path)
	res.send(url)
}) 

app.get<object, {url: string}| object, object, { base_url: string, slug: string }, object>('/url', async (req, res) => {
  const url = await getUrl(req.query.base_url, req.query.slug)
  res.send(url ? {url: `${url.baseUrl}/${url.slug}`}: {})
})

const server = app.listen(3000, () => { console.log('Server running on port 3000') })

module.exports = server
