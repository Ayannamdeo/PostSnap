# Step 1: Use the official Node.js image as a base image
FROM node:18

# Step 2: Set the working directory in the container/ effectively work as pwd for the application
WORKDIR /usr/src/app

# Step 3: Copy the package.json and package-lock.json to install dependencies also tsconfig.json
COPY package*.json ./
COPY tsconfig.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the entire backend codebase to the working directory in the container
COPY . .

# Step 6: Expose the port the backend is running on 
EXPOSE 5000

# Step 5: Build the TypeScript code
RUN npm run build

# Step 7: Start the backend application
CMD ["npm", "start"]

