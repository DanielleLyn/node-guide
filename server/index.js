// require express
const express = require('express');

// invoke express and set it to the app variable
const app = express();

// body parser converts the object sent over in post and put to json and then attaches it to req.body
const bodyParser = require('body-parser');

// app.use tells express to run body parser on every endpoint;
app.use(bodyParser.json());

// starting array
const array = ["1","2"];

// get endpont
app.get('/api/get_endpoint', (req, res) => {
    // check to see if the endpoint was hit
    console.log('get_endpoint');

    // send the requested data
    res.send(array);
})

//post endpoint
app.post('/api/post_endpoint', (req, res) => {
    // check to see if the endpoint was hit
    console.log('post_endpoint');

    // increment our number
    if(req.body.val){

        array.push(req.body.val)

    }

    //json back the new array with new data
    res.json(array);
})

app.put('/api/put_endpoint', (req, res) => {
    // grab the new number variable we set in our react app
    let newVal = req.body.new;
    let old = req.body.old;

    // check to see if the endpoint was hit and make sure our values are correct
    console.log('put_endpoint', newVal, old);

    // get the index of the value to be updated
    let index = array.findIndex((e) => e == old)

    // check to make sure we are getting a valid index
    console.log(index);

    //update that number at the given index
    array[index] = newVal;

    //send the data back
    res.status(200).send(array)
})


app.delete('/api/delete_endpoint', (req, res) => {
    const { delete_value } = req.query

    // get the index of the value to be updated
    let index = array.findIndex((e) => e == delete_value)
    console.log(index);
    if(index !== -1){
    array.splice(index, 1);
    }
    res.status(200).send(array);
})


const port = 4000;
app.listen(port, () => console.log(`the server has started on port ${port}`))