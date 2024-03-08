FROM cypress/browsers:node12.18.3-chrome87-ff82

WORKDIR /app

COPY ./package*.json ./
RUN npm i 

COPY . .

ENTRYPOINT ["npm", "run", "cy:run"]