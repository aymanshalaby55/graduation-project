
FROM node:22-alpine


WORKDIR /app


COPY package*.json ./


ENV NEXT_IGNORE_SWCPW=true


RUN npm install --force


COPY . .


RUN npm run build


EXPOSE 3000

CMD ["npm", "start"]
