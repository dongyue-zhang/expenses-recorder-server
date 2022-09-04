const { v4: uuid } = require('uuid');
const express = require('express')
const bodyParser = require('body-parser');
const hbs = require("hbs");
const path = require("path");
const connectMongoDB = require('./config/db.js');
const cors = require('cors');
const Expense = require('./model/expense.model');

const port = 5001;

const app = express();
// app.set("view engine", "hbs");
// app.engine('html', hbs.__express);

// app.set("views", path.join(__dirname, "../public"));
app.use(express.static(path.join(__dirname + '/../public')));
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
connectMongoDB().then(()=> {
    console.log('Connected to MongoDB')
})

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static('build'));
app.get('/records', async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
    
})

app.post('/records', async (req, res) => {
    let { record } = req.body;
    record = {...record, date: record.date == null ? undefined : record.date}
    try {
        const expense = new Expense(record);
        await expense.save();
        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({message: 'Server Error'});
    }
});

app.delete('/records/:id', async (req, res) => {

    try {
        const { id } = req.params;
        const removedrecord =  await Expense.findOne({_id: id});
        await Expense.remove({_id: id});
        console.log(removedrecord);
        res.status(200).json(removedrecord);
    } catch (error) {
        res.status(500).json({ message: 'Server Error'});
    }

})

const PORT = process.env.PORT || port;

app.listen(PORT, ()=> console.log(`Server runs on PORT ${PORT}`));