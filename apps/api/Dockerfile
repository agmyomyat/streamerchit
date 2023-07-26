# Base image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY ./apps/api/package*.json ./

# Install app dependencies
RUN npm install

COPY ./apps/api/ .

RUN	npx prisma generate
# Bundle app source
# Creates a "dist" folder with the production build
RUN npm run build

EXPOSE 3333

# Start the server using the production build
CMD [ "node", "dist/main.js" ]