# Imagem base
FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG JWT_SECRET
ARG DATABASE_URL

ENV JWT_SECRET=$JWT_SECRET
ENV DATABASE_URL=$DATABASE_URL

RUN npm run build

EXPOSE 3000

# Start
CMD ["node", ".output/server/index.mjs"]