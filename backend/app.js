const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mechanicRoutes = require('./routes/mechanics');
const taskRoutes = require('./routes/tasks');

app.use(cors());
app.use(bodyParser.json());

app.use('/api/mechanics', mechanicRoutes);
app.use('/api/mechanics', taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});