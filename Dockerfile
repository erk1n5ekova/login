FROM node:22.4.1-alpine3.20

WORKDIR /home/app

COPY . .

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL ${NEXT_PUBLIC_API_URL}

RUN npm install -g pnpm@9.7.1 && pnpm install && pnpm build

EXPOSE 3000 

CMD ["pnpm", "start"]
