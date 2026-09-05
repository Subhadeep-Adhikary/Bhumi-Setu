const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/project');

const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bhumi-setu';

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

app.get('/health', (req, res) => {
	res.json({ status: 'ok' });
});

async function startServer() {
	try {
		await mongoose.connect(mongoUri);
		app.listen(port, () => {
			console.log(`Server is running on port ${port}`);
		});
	} catch (error) {
		console.error('MongoDB connection failed:', error.message);
		process.exit(1);
	}
}

startServer();
