FROM oven/bun
COPY . .
EXPOSE 3000
ENTRYPOINT ["bun",  "dev"]