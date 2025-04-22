# Take node image 
FROM node:18-alpine

# Make a directory in which all work to be done
WORKDIR /music_player

# Copy Dependency main to docker image
COPY package*.json ./

# To install npm(node package tool)
RUN npm i

# To copy all code file in current directory
COPY . .

# Expose Port
EXPOSE 3000

# To run application
CMD ["node", "app.js"]
