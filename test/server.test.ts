import { Url } from '@prisma/client'
import { createHash } from 'crypto'
import {expect, jest } from '@jest/globals'
import request from 'supertest'
// import { MockContext, Context, createMockContext } from './context.ts'
import * as app from '../src/server'
import {  MockContext, Context, createMockContext } from './context'
import { prismaMock } from './singleton'
import { mock } from 'node:test'



// jest.mock('@prisma/client', () => ({
//   PrismaClient: jest.fn().mockImplementation(() => ({
//     url: {
//       upsert: jest.fn(),
//       findUnique: jest.fn(),
//     },
//   })),
// }))

// export const prismaMock = new PrismaClient() as unknown as DeepMockProxy<PrismaClient>


describe('app', () => {
  let mockCtx: MockContext
  let ctx: Context

  beforeEach(() => {
    mockCtx = createMockContext()
    ctx = mockCtx as unknown as Context
    jest.clearAllMocks()
  })

  describe('POST /url', () => {
    it('should create a new URL with a unique slug', async () => {
      const baseUrl = 'https://example.com'
      const path = '/test/path'
      const slug = createHash('sha256').update(path).digest('hex').substring(0, 8)
      const now = new Date()

      const expectedUrl: Url = {
        baseUrl,
        path,
        slug,
        deprecationDate: now,
        createdAt: now
      }

      // Mock the upsert function
      prismaMock.url.upsert.mockResolvedValue(expectedUrl)

      // Make the request
      const response = await request('http://localhost:3000').post('/url').send({ base_url: baseUrl, path })

      expect(response.status).toBe(200)
      expect(response.body).toEqual(expectedUrl)

      // Check that the upsert function was called with the correct arguments
      expect(prismaMock.url.upsert).toHaveBeenCalledWith({
        where: { baseUrl_slug: { baseUrl, slug } },
        update: { deprecationDate: now.toISOString() },
        create: {
          baseUrl,
          path,
          slug,
          deprecationDate: now.toISOString(),
        },
      })
    })
  })

  describe('GET /url', () => {
    it('should return the URL for a given base URL and slug', async () => {
      const baseUrl = 'https://example.com'
      const slug = createHash('sha256').update('/test/path').digest('hex').substring(0, 8)
      const expectedUrl: Url = {
        baseUrl,
        path: '/test/path',
        slug,
        createdAt: new Date(),
        deprecationDate: new Date(),
      }

      // Mock the findUnique function
      prismaMock.url.findUnique.mockResolvedValue(expectedUrl)

      // Make the request
      const response = await request(app).get('/url').query({ base_url: baseUrl, slug })

      expect(response.status).toBe(200)
      expect(response.body).toEqual({ url: `${baseUrl}/${slug}` })

      // Check that the findUnique function was called with the correct arguments
      expect(prismaMock.url.findUnique).toHaveBeenCalledWith({ where: { baseUrl_slug: { baseUrl, slug } } })
    })
  })
})
