FROM node:16

WORKDIR /app

COPY package*.json ./ 

# Install dependencies
RUN npm install

COPY . .

# Salin file .env ke dalam container
COPY .env .env

CMD ["npm", "start"]

EXPOSE 5000
