FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8000

RUN npx prisma generate

CMD ["npx", "nodemon", "--legacy-watch", "index.js"]
