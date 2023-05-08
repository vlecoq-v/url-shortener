import Express from 'express'
import { PrismaClient } from '@prisma/client'

const app = Express()
app.use(Express.json());

// app.get('/', async (req, res) => {
// 	res.send('hello Worlds')
// })

// SET UP PRISMA ORM
const prisma = new PrismaClient()

async function createUrl(baseUrl: string, path: string, slug: string, deprecationDate?: Date) {
  const url = await prisma.url.create({
    data: {
      baseUrl,
      path,
      slug,
      deprecationDate,
    },
  })

  return url
}

export interface TypedRequestBody<T> extends Express.Request {
    body: T
}


app.post('/url', async (
  req: TypedRequestBody<{ base_url: string, path: string , slug: string}>,
  res: Express.Response,
) => {
  console.log(req.body)
	const url = await createUrl(req.body.base_url, req.body.path, req.body.slug + Date.now())
	res.status(200).json(url)
}) 

app.listen(3000, () => { console.log('Server running on port 3000') })