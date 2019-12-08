FROM node:8

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY . .

RUN npm install
RUN npm run build
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.5.0/wait /wait
RUN chmod +x /wait
EXPOSE 3000

CMD ["npm", "run", "start"]



