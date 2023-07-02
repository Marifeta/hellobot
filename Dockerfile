FROM alpine AS bulder
ENV CHAT_ID=0
ENV TOKEN='none'
RUN apk add --update npm
WORKDIR /app
COPY . .
RUN npm ci
ENTRYPOINT npm run start


