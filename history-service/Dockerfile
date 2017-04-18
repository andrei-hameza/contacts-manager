FROM node:7.9.0-alpine

RUN addgroup -S user && adduser -S -g user user

ENV HOME=/home/user

COPY index.js package.json config.json start.sh $HOME/app/

COPY config $HOME/app/config

COPY models $HOME/app/models

COPY web $HOME/app/web

COPY worker $HOME/app/worker

ADD https://github.com/Yelp/dumb-init/releases/download/v1.1.1/dumb-init_1.1.1_amd64 /usr/local/bin/dumb-init

ADD start.sh /usr/local/bin/start.sh

WORKDIR $HOME/app

RUN chown -R user:user $HOME/* /usr/local/ && \
chmod u+x /usr/local/bin/dumb-init && \
chmod u+x /usr/local/bin/start.sh && \
npm cache clean && \
npm install --silent --progress=false --production

USER user

EXPOSE 3001

CMD ["dumb-init", "sh", "start.sh"]
