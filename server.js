const express = require('express')
const app = express()
const port = 3000
//https://runkit.com/
app.get('/hello', (req, res) => {
  res.send('Hello World!')
})


//Create Table
app.get('/mcreatetable', (req, res) => {var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
  endpoint: AWS.config.update({endpoint: "https://dynamodb.us-east-1.amazonaws.com"})
})

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "Movies",
    KeySchema: [       
        { AttributeName: "year", KeyType: "HASH"},  //Partition key
        { AttributeName: "title", KeyType: "RANGE" }  //Sort key
    ],
    AttributeDefinitions: [       
        { AttributeName: "year", AttributeType: "N" },
        { AttributeName: "title", AttributeType: "S" }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    }
};

dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});
    
  })






  //Delete 

  app.delete('/deletetable', (req, res) => {
    var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
  endpoint: "https://dynamodb.us-east-1.amazonaws.com"
});

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "Movies"
};

dynamodb.deleteTable(params, function(err, data) {
    if (err) {
        console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Deleted table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});
  })




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
