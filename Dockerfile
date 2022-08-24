FROM node:lts-alpine

WORKDIR /wchatbot
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
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
RUN npm install pm2 -g
COPY . /wchatbot
RUN npm install
EXPOSE 3000
CMD pm2 start src/main.js \ 
        --node-args='--es-module-specifier-resolution=node' \
        --name wchatbot && \
    pm2-runtime start src/httpCtrl.js \
        --node-args='--es-module-specifier-resolution=node' \
        --name wchatbotcp