FROM node:18-alpine AS base

WORKDIR /app
ENV PATH="/app/node_modules/.bin:${PATH}"

COPY package*.json ./
RUN npm ci

COPY . .
EXPOSE 3000

FROM base AS dev
ENV NODE_ENV=development
CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0", "-p", "3000"]

FROM base AS prod
ENV NODE_ENV=production
RUN npm run build && npm prune --omit=dev
CMD ["npm", "run", "start", "--", "-H", "0.0.0.0", "-p", "3000"]
