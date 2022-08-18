const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const path = require('path');
const {readdir} = require('fs').promises;
const uuid = require('uuid');

const app = express();

app.use(cors());
app.use(express.static('./static'));
app.use(express.urlencoded());
app.use(fileUpload());

app.post('/', (req, res)=>{
    const {name} = req.body;
    const pictureFile = req.files?.picture;

    if( !name || !pictureFile ) {
        return res.status(400).send({msg: 'Missing required field'});
    }

    const extension = path.extname(pictureFile.name);
    const fileName = uuid.v1() + extension;

    pictureFile.mv(path.resolve('./static/pictures/' + fileName), (err)=>{
        if(err){
            console.log(err);
            return res.send(err);
        }
        res.send({name, picture: `/picture/${fileName}`});
    });
});

app.get('/', async (req, res)=>{
    const dir = path.join(__dirname, 'static', 'pictures');
    try{
        const files = await readdir(dir);
        const urls = files.filter(file => file !== '.gitkeep').map(file => ({name: file, url: `/pictures/${file}`}));
        res.json(urls);
    } catch(err){
        console.error(err);
        res.json(err);
    }
})

app.listen(5000, ()=>{
    console.log('server listening on 5000');
});