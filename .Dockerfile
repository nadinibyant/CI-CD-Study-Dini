FROM node:16

WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm install

COPY . .

# Set environment variables
ENV DB_USER=root
ENV DB_PASSWORD=
ENV DB_HOST=localhost
ENV DB_NAME=db_ci/cd
ENV PORT=5000

CMD ["npm", "start"]

EXPOSE 5000
