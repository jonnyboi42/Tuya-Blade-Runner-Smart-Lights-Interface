import express, { Request, Response } from 'express';
import cors from 'cors';  // Import the cors middleware
const { controlDevice } = require('./nodejs_demo.ts');

const app = express();

// Enable CORS for specific origin
app.use(cors({
  origin: 'http://localhost:5173'  // Allow requests from this origin
}));

app.use(express.json());

app.post('/control', async (req: Request, res: Response) => {
    const { deviceId, command } = req.body; // Get deviceId and command from frontend
    try {
      const response = await controlDevice(deviceId, command);
      res.json(response);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send(error.message);
      } else {
        res.status(500).send('An unknown error occurred.');
      }
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});