import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import {connect} from "./database";
import AppRouter from './router'
import multer from 'multer'
import path from 'path';
import nodemailer from 'nodemailer';
import {smtp} from './config'


// setup Email

let email = nodemailer.createTransport(smtp);


//File Storage Config

 const storageDir = path.join(__dirname,'..', 'storage');
 const storageConfig = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, storageDir)
    },
    filename: (req, file, cb) => {

        cb(null, Date.now()+ path.extname(file.originalname))
    }
});

const  upload = multer({ storage: storageConfig })



//End File Storage Config
const PORT = 3000;
const app = express();
app.server = http.createServer(app);



app.use(morgan('dev'));


app.use(cors({
    exposedHeaders: "*"
}));

app.use(bodyParser.json({
    limit: '50mb'
}));

app.set('root', __dirname);
app.set('storageDir',storageDir);
app.set('upload',upload);
app.email = email;


//Connect to database
connect((err,db)=> {

    if (err) {
        console.log("An error connecting to the database");
        throw(err);
    }
    app.set('db',db);

    //init router
    new AppRouter(app);
    app.server.listen(process.env.PORT || PORT, () => {
        console.log(`App is running on port ${app.server.address().port}`);
    });
});

export default app;

