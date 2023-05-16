const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json())

//#chat gpt solution pour permettre à ceux que mon image soit afficher
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    /*if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }*/

    next();
});

//en haut y a le code
const corsOption = {
    origin:"*"
}
app.use(cors(corsOption))
app.use('/api', require('./route/song'))

app.use('/folder', require('./route/folder'))

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
