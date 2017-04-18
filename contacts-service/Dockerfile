FROM node:7.9.0-alpine

RUN addgroup -S user && adduser -S -g user user

ENV HOME=/home/user

COPY package.json config.json $HOME/app/

COPY src/ $HOME/app/src

ADD https://github.com/Yelp/dumb-init/releases/download/v1.1.1/dumb-init_1.1.1_amd64 /usr/local/bin/dumb-init

WORKDIR $HOME/app

RUN chown -R user:user $HOME/* /usr/local/ && \
chmod u+x /usr/local/bin/dumb-init && \
npm cache clean && \
npm install --silent --progress=false --production

USER user

EXPOSE 3000

CMD ["dumb-init", "npm", "start"]
