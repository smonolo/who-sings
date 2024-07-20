FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json /app
RUN npm ci

COPY . /app
RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY package*.json /app
RUN npm ci --omit=dev

COPY --from=builder /app/dist /app/dist

CMD ["node", "/app/dist/index.js"]