FROM node:20-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .
COPY . .

RUN npm ci
RUN npm run build

EXPOSE 43261

CMD ["node", "dist/index.js"]