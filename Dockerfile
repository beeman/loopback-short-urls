FROM mhart/alpine-node:5

WORKDIR /src

ADD . .

RUN npm install

ENV NODE_ENV production

CMD [ "npm", "start" ]

