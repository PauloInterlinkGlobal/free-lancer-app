FROM node:24-alpine AS deps
# Nota: recomendação do Next.js, instalar a lib libc6-compat no Alpine para melhor compatibilidade nativa
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:24-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_APP_VERSION
ARG NEXT_PUBLIC_BUILD
ARG NEXT_PUBLIC_API_SMSILLICO
ARG NEXT_PUBLIC_WEBSOCKET_SMSILLICO

ENV NEXT_PUBLIC_APP_VERSION=$NEXT_PUBLIC_APP_VERSION
ENV NEXT_PUBLIC_BUILD=$NEXT_PUBLIC_BUILD
ENV NEXT_PUBLIC_API_SMSILLICO=$NEXT_PUBLIC_API_SMSILLICO
ENV NEXT_PUBLIC_WEBSOCKET_SMSILLICO=$NEXT_PUBLIC_WEBSOCKET_SMSILLICO

RUN yarn build

FROM node:24-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]