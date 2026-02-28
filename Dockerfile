FROM node:20-alpine AS base

WORKDIR /opt/app
ENV PATH="/opt/app/node_modules/.bin:${PATH}"

COPY package*.json ./
RUN npm ci

COPY . .
EXPOSE 1337

FROM base AS dev
ENV NODE_ENV=development
CMD ["npm", "run", "develop"]

FROM base AS prod
ENV NODE_ENV=production
RUN npm run build && npm prune --omit=dev
CMD ["npm", "run", "start"]
