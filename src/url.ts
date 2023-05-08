import prisma from "./prisma/prisma"
import { getSlug } from "./server"

// ORM FUNCTIONS

export async function upsertUrl(baseUrl: string, path: string) {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const slug = getSlug(path)

  const url = await prisma.url.upsert({
    where: { baseUrl_slug : { baseUrl, slug }  },
    update: { deprecationDate: tomorrow.toISOString() },
    create: {
      baseUrl,
      path,
      slug,
      deprecationDate: tomorrow.toISOString(),
    },
  })

  return url
}

export async function getUrl(baseUrl: string, slug: string) {
  const url = await prisma.url.findUnique({ where: { baseUrl_slug : { baseUrl, slug }  } })
  return url
}