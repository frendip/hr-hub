import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/index.js';
import errorHandling from './middleware/ErrorHandling.js';

dotenv.config();
const PORT = process.env.PORT || 9000;

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);
app.use(errorHandling);

try {
    app.listen(PORT, () => {
        console.log(`Server started on PORT ${PORT}`);
    });
} catch (error) {
    console.log('Server startup failure: ', error);
}
