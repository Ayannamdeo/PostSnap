# Step 1: Use Node.js for the build stage
FROM node:18 AS build

# Step 2: Set up working directory
WORKDIR /usr/src/app

# Step 3: Install dependencies and build the frontend
COPY package*.json ./
COPY postcss.config.js ./
COPY tailwind.config.js ./
COPY vite.config.js ./

RUN npm install
COPY . .
# Set VITE_API_URL here directly
ENV VITE_API_URL=https://postsnap-server-542855620662.asia-south2.run.app/api
ENV VITE_APIKEY=AIzaSyAIHZdDIaH_2JSRpfKqNRg-tQ8sG0_mlqk
ENV VITE_AUTHDOMAIN=postsnap-15c17.firebaseapp.com
ENV VITE_PROJECTID=postsnap-15c17
ENV VITE_STORAGEBUCKET=postsnap-15c17.appspot.com
ENV VITE_MESSAGINGSENDERID=391924389530
ENV VITE_APPID=1:391924389530:web:219c2f46f7127a079ab123
ENV VITE_MEASUREMENTID=G-6CRB31FSNV


RUN npm run build

# Step 4: Use a lightweight Node.js server to serve the static build
RUN npm install -g serve
CMD ["serve", "-s", "dist", "-l", "8080"]
# CMD ["npm", "run", "dev"]

# Step 5: Expose port 3000
EXPOSE 8080
