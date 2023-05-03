const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json())
const corsOption = {
    origin:"*"
}
app.use(cors(corsOption))
app.use('/api', require('./route/song'))


app.get('/',(req,res)=>{
    res.status(200).send('Tu es connecté')
})
/*app.use((req, res)=>{
    if (res.statusCode === 500) res.send('something broke')
    res.send('api is active')
})*/


app.listen(8080, () => {
    console.log('Server started on port 8080');
});
