import express from 'express';
import snippetRoutes from './routes/snippetRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', snippetRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 