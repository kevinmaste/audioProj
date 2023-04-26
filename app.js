const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/song', require('./route/song'))

/*app.use((req, res)=>{
    if (res.statusCode === 500) res.send('something broke')
    res.send('api is active')
})*/


app.listen(8080, () => {
    console.log('Server started on port 8080');
});
