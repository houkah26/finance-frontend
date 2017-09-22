# Finance App Front-End

Stock trading simulator where authenticated users can quote, buy, and stock based on real time stock data.

[Link to Finance App hosted on heroku](https://finance-frontend.herokuapp.com/)

[back-end code](https://github.com/houkah26/finance-backend) 

## Features
* User Authentication utilizing JSON Web Tokens
* Real time (15 minute delay) stock prices via a Yahoo API fetched from the back-end
* Buy/Sell stocks
* View sortable stock portfolio and transaction history
* Time series stock charts (data via Tradier API)
* Add funds/cash
* User info page which also shows trading performance (net gain)
* Progressive Web App

## Technologies
* Framework: React
* State management: Redux
* UI: Semantic-UI
* Client Side Routing: React-Router (as well as React-Router-Redux)
* Form management/validation: Redux Form
* Deployment: Heroku
* Bootstrapped with Create-React-App

## TO-DO
* Add prop types (In progress)
* Pagination for history
* Filter table for portfolio/history
* Improve error handling

