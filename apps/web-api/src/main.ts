import express from 'express';
import cors from 'cors';
import userRoutes from './api/user/user.routes';
import questionsRoutes from './api/questions/all-questions/theory-questions.routes';
import userProgressRoutes from './api/questions/user-answers/user-answers.routes';
import statisticsRoutes from './api/statistics/statistics.routes';
import healthRoutes from './api/health/health.routes';
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:4200',
  })
);

app.use('/user', userRoutes);
app.use('/health', healthRoutes);
app.use('/questions', questionsRoutes);
app.use('/user-answers', userProgressRoutes);
app.use('/statistics', statisticsRoutes);

app.listen(3000, () => {
  console.log('listening on port ', 3000);
});
