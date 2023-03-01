FROM node

WORKDIR /src/index

COPY package.json /src/index/

RUN npm i

COPY . .

EXPOSE 5000

CMD [ "yarn", "dev" ]


