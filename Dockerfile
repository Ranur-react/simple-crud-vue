# Use an official Node.js runtime as a parent image
FROM node:latest

# Set environment variables
ENV DEBIAN_FRONTEND=noninteractive

# Install OpenSSH server and Git
RUN apt-get update && \
    apt-get install -y openssh-server git && \
    mkdir /var/run/sshd

# Create a new user with password 'docker' and give them sudo access
RUN echo 'root:Padri0@@@' | chpasswd
RUN sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config
RUN sed -i 's/#PasswordAuthentication yes/PasswordAuthentication yes/' /etc/ssh/sshd_config

# Expose SSH port
EXPOSE 22

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# COPY /node-glints/package*.json ./
# COPY /waweb-api/package*.json ./
COPY /absekol-backend/package*.json ./
RUN npm install

# Bundle app source
# COPY /node-glints/. .
# COPY /waweb-api/. .
COPY /absekol-backend/. .

# Expose the Node.js app port
EXPOSE 3002

# Start SSH and the Node.js app
CMD service ssh start && npm start

