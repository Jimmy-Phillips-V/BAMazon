var mysql = require("mysql")
var inquirer = require("inquirer")

var connection = mysql.createConnection({
    user:"root",
    password:"password",
    database:"bamzon_DB",
})

connection.query("SELECT * FROM products", function(err, result){
    // console.log(result)
    inquirer
    .prompt([
        {
            name: "q1",
            type: "list",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
            message: "What would you like to do?"
        }
    ]).then(function(answers){
        console.log(answers.q1)
        // view products for sale
        if(answers.q1 == "View Products for Sale") {
            console.log(result)
            connection.end()
        }
        // view low inventory
        else if(answers.q1 == "View Low Inventory") {
            // establish connection to find products with low quantity
            connection.query('SELECT * FROM products WHERE stock_quantity <= 5', function(err, result) {
                for(var i = 0; i < result.length; i++) {
                console.log(result[i].product_name + ": " + result[i].stock_quantity)
                connection.end()
                }
            }
        )}
        // add to inventory
        else if(answers.q1 == "Add to Inventory") {
            console.log(result)
            inquirer
            .prompt([
                {
                    name: "q2",
                    type: "input",
                    message: "What is the name of the product you'd like to restock?"
                }
            ]).then(function(answers){
            // loop through all products to search for the product and then add to it
            for(var i = 0; i < result.length; i++) {
                if(result[i].product_name == answers.q2) {
                    var newQuantity = result[i].stock_quantity + 15
                    connection.query(`UPDATE products SET stock_quantity = ${newQuantity} WHERE product_name = ${answers.q2}`, function(err, result ){
                        console.log(`Your current inventory of ${answers.q2} is: ${newQuantity} `)
                        connection.end()
                    }
                 )}    
                else {
                    console.log("Not an existing product")
                    connection.end()
                    }
                }   
            })
        }
        // add new product
        else if(answers.q1 == "Add New Product") {
            inquirer
            .prompt([
                {
                    name: "q3",
                    type: "input",
                    message: "What is the name of the product you'd like to add?"
                },
                {
                    name: "q4",
                    type: "input",
                    message: "What is the price of the product you'd like to add?"
                },
                {
                    name: "q5",
                    type: "input",
                    message: "What is the name of the department for the product you'd like to add?"
                },
                {
                    name: "q6",
                    type: "input",
                    message: "What is the quantity of the product you'd like to add?"
                }
            ]).then(function(answers){
                // store answers in variables
                    var newProduct = answers.q3
                    var newProductPrice = parseInt(answers.q4)
                    var newProductDepartment = answers.q5
                    var newProductQuantity = parseInt(answers.q6)
                    // create connection to insert variables into sql
                    connection.query(`INSERT INTO products (product_name, price, department_name, stock_quantity) VALUES ("${newProduct}", ${newProductPrice}, "${newProductDepartment}", ${newProductQuantity})`, function(err, result){
                        connection.query("SELECT * FROM products", function(err, result){
                            console.log(result)
                        })
                        connection.end()
                    })
            })// end answers function
        } // end of else if 3
    })
})