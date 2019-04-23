FROM node:10

RUN mkdir -p /opt/app
# ENV NODE_ENV production
ENV PORT 3000
EXPOSE 3000

WORKDIR /opt/app
COPY . /opt/app

RUN npm install && npm run build

CMD ["npm", "start"]
