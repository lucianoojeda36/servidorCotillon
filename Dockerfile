FROM node:lts-alpine

RUN mkdir -p /app

WORKDIR /app

RUN apk update && apk add --no-cache nmap && \
  echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
  echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
  apk update && \
  apk add --no-cache \
  chromium \
  harfbuzz \
  "freetype>2.8" \
  ttf-freefont \
  nss

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
  PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

COPY . .

RUN npm install

COPY . .

RUN npm run build

COPY .env ./build/

RUN npm install

EXPOSE 3000

CMD node build/src/index.js