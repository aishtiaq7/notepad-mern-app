# Use a lighter version of Node as a parent image
FROM node:14-alpine

# Set the working directory to /client
WORKDIR /client

# Copy package-lock.json into the container at /client
COPY package-lock.json /client/

# Install dependencies
RUN npm install

# Copy the rest of the project files into the container at /client
COPY . /client/

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
