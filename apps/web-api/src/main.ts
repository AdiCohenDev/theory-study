import express from 'express';
import cors from 'cors';
import userRoutes from './api/user/user.routes';
import questionsRoutes from './api/questions/questions.routes';

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:4200',
  })
);

app.use('/user', userRoutes);
app.use('/questions', questionsRoutes);

app.listen(3000, () => {
  console.log('listening on port ', 3000);
});
