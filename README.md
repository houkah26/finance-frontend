# Finance App Front-End

User interface to consume [backend API](https://github.com/houkah26/finance-backend) for buying and selling stock.

[Link to Finance App hosted on heroku](https://finance-frontend.herokuapp.com/)

## Features
* User Authentication utilizing JSON Web Tokens
* Real time (15 minute delay) stock prices via a Yahoo API from the back-end
* Buy/Sell stocks
* View sortable stock portfolio and transaction history
* Add funds/cash
* User info page which also shows trading performance (net gain)

## Technologies
* Framework: React
* State management: Redux
* UI: Semantic-UI
* Client Side Routing: React-Router (as well as React-Router-Redux)
* Form management/validation: Redux Form
* Deployment: Heroku
* Bootstrapped with Create-React-App

## TO-DO
* Prop-Types / Flow
* Improve responsivene/mobile layout
* Pagination for history
* Filter table for portfolio/history
* Seperate route file
* Graphs for stock information
* Improve error handeling
* Buy stock form: clear calculated price on form change
* Seperate API file/folder
* List component
* Update Footer
* Add content to homepage
* Header title

