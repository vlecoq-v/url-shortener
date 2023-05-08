FROM node:18-alpine

RUN apk add --no-cache bash
RUN apk add --no-cache postgresql-client

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# ENV DATABASE_URL postgres://postgres:password@db:5432/url_shortener

# run migration, should be done in a distinct migration CI and in prod with  RUN npx prisma migrate deploy
CMD ["npm", "run", "dev"]
