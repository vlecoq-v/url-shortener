FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --quiet

COPY /src src

# run migration, should be done in a distinct migration CI and in prod with  RUN npx prisma migrate deploy
CMD ["npm", "run", "dev"]
