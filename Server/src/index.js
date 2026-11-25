import express from 'express';
import router from './routes.js';
import mongooseInit from './config/mongooseInit.js';
import expressInit from './config/expressInit.js';
import { PORT } from './config/constants.js';

const app = express();

mongooseInit();
expressInit(app);

app.use(router);
app.listen(PORT, () => console.log(`Retrofy API running on port ${PORT}`));
