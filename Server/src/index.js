import express from 'express';
import router  from './routes.js';
import mongooseInit from './config/mongooseInit.js';
import expressInit from './config/expressInit.js';


const app = express();

mongooseInit();
expressInit(app);

app.use(router);
app.listen(3000, () => console.log('Server running on port 3000'));
