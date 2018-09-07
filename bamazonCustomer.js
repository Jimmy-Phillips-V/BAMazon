var mysql = require("mysql")
var inquirer = require("inquirer")

var connection = mysql.createConnection({
    user:"root",
    password:"password",
    database:"bamzon_DB",
})

connection.query("SELECT * FROM products", function(err, result){
    console.log(result)
    inquirer
    .prompt([
        {
            name: "q1",
            type: "input",
            message: "What is the product ID you'd like to buy?"
        },
        {
            name: "q2",
            type: "input",
            message: "How many would you like to buy?"
        }
    ]).then(function(answers){
        // console.log(answers.q1)
        for(var i = 0; i < result.length; i++){
            if(result[i].item_id == answers.q1) {
                // console.log(result[i])
                if(result[i].stock_quantity >= answers.q2) {
                    // console.log("plenty in stock")
                    //detract from existing stock
                    var newQuantity = result[i].stock_quantity - answers.q2
                    var totalCharged = result[i].price * answers.q2
                    connection.query(`UPDATE products SET stock_quantity = ${newQuantity} WHERE item_id = ${answers.q1}`, function(err, result ){
                        console.log(`Your order has been purchased for $${totalCharged}`)
                        connection.end()
                    })
                } 
                else {
                    console.log("not enough in stock")
                    connection.end()

                }
            }
        }
    })
})