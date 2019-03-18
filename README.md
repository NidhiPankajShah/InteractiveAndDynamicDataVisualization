This project uses:
Front end:
Bootstrap
D3
HTML5
CSS3
Google API

Back end:
Node javascript
MySQL

Instruction to run the project:

Navigate till this folder
In cmd run 'http-server -c-1'

For backend:

Start the XAMPP controller
Start Apache and MySQL 
Create databse: inventorymangement
Create table: sales(`InvoiceNo`, `StockCode`, `Description`, `Quantity`, `InvoiceDate`, `UnitPrice`, `CustomerID`, `Country`, `Time`, `Month`, `TimeDigits`)
Create table: inStock(`product_id`, `product_name`, `quantity`, `product_code`, `cost`, `date`, `description`, `country`)


Navigate till backend folder.
In cmd run(Only one time) : npm install
In cmd run: npm start

