FROM node:19

WORKDIR /usr/src/app

ADD package.json package.json
ADD package-lock.json package-lock.json
RUN npm install

RUN chown -R node:node node_modules

ADD . /usr/src/app

USER node

# CMD ["npm", "run", "build"]
CMD ["npm", "start"]
# CMD ["bash"]
