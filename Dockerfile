# take node image 
FROM node:18-alpine

# make a directory in which all work to be done
WORKDIR /music_player

# copy package.json file in current working directory
COPY package*.json ./
	
# to install npm (node package tool)
RUN npm i

# to copy all other file in current directory
COPY . .

# give port 
EXPOSE 3000

# to run application
CMD ["node", "app.js"]

