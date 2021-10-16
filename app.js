const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(require('./routes'));

app.listen(PORT, () => {
    console.log(`It is running on port ${PORT}`);
})