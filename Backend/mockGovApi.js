const express = require('express');

const app = express();
const port = 6000;

const landowners = [
	'Aarav Sharma',
	'Aditi Verma',
	'Ajay Kumar',
	'Akhil Reddy',
	'Amit Patel',
	'Ananya Singh',
	'Anil Mehta',
	'Anjali Nair',
	'Arjun Das',
	'Asha Iyer',
	'Bhavna Joshi',
	'Bharat Rao',
	'Chandan Yadav',
	'Deepa Menon',
	'Devendra Gupta',
	'Dinesh Pawar',
	'Farah Khan',
	'Gaurav Mishra',
	'Geeta Kulkarni',
	'Hari Prasad',
	'Harish Babu',
	'Indira Devi',
	'Jagdish Thakur',
	'Jaya Krishnan',
	'Kailash Saini',
	'Kavita Deshmukh',
	'Kiran Shah',
	'Lakshmi Narayanan',
	'Mahesh Jadhav',
	'Malini Roy',
	'Manoj Tiwari',
	'Meena Kumari',
	'Mohan Lal',
	'Nandini Bose',
	'Neeraj Choudhary',
	'Nisha Kapoor',
	'Omkar Patil',
	'Pankaj Tripathi',
	'Pooja Sinha',
	'Pradeep Nair',
	'Priya Menon',
	'Rahul Desai',
	'Rajesh Pillai',
	'Rakesh Yadav',
	'Rekha Sharma',
	'Rohit Bansal',
	'Sanjay Naik',
	'Savita Rani',
	'Shamim Akhtar',
	'Shivani Gupta',
	'Suresh Reddy',
	'Sushma Devi',
	'Tarun Malhotra',
	'Usha Rao',
	'Vijay Singh',
	'Vikram Joshi',
	'Vinod Kumar',
	'Yogesh Patil',
	'Zoya Khan',
];

app.get('/verify', (req, res) => {
	const { documentId } = req.query;
	const verified = typeof documentId === 'string'
		&& documentId.startsWith('GOV')
		&& documentId.length > 5;

	if (!verified) {
		return res.json({ verified: false });
	}

	const landowner = landowners[Math.floor(Math.random() * landowners.length)];
	return res.json({ verified: true, landowner });
});

if (require.main === module) {
	app.listen(port, () => {
		console.log(`Mock government API running on port ${port}`);
	});
}

module.exports = app;