const app = require('./app.js')
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 3000;

console.log('Connection has been established successfully.');
app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`Server is running on port ${PORT}`);
    return app;
});