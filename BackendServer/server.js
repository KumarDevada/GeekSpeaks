const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
app.use(cors());

const mongoose = require('mongoose')
const Users = require('./schemas/userSchema')
const Questions = require('./schemas/questionSchema')
const Articles = require('./schemas/articleSchema')

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const url = 'mongodb+srv://KumarDevada:KumarDevada@cluster0.kdx2brx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Middleware to parse JSON and handle URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect to mongodb server
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB server...');
}).catch(err => {
    console.log('Error connecting to MongoDb: ',err);
})





// User Signup
// Create user
app.post('/user/signup', (req,res) => {
    const {name, email, password } = req.body
    const newUser = new Users({name, email, password})
    newUser.save()
        .then(response => {
            res.status(201).json(response);
        })
        .catch(err => {
            res.status(500).json({error: err.message})
        })
})

// User login
app.post('/user/login',async (req,res) => {
    try {
        const {email, password} = req.body
        const user = await Users.findOne({ email, password });
        if(!user) {
            return res.status(404).json(user);
        }
        return res.status(200).json(user);
    }
    catch(err) {
        res.status(500).json({ message: 'Internal server error' });
    }
})





// Articles
// Read
app.get('/article', (req,res) => {
    Articles.find({})
        .then(response => {
            res.status(201).json(response)
        })
        .catch(err => {
            res.status(500).json({error: err.message})
        })
})
// create articles
app.post('/article/new', (req,res) => {
    const {heading, text, code, language, uid, uname, date} = req.body
    const newArticle = new Articles({heading, text, code, language, uid, uname, date})
    newArticle.save()
        .then(response => {
            res.status(201).json(response);
        })
        .catch(err => {
            res.status(500).json({error: err.message})
        })
})


// Questions 
// all questions
app.get('/question',(req,res) => {
    Questions.find({})
        .then(response => {
            res.status(201).json(response)
        })
        .catch(err => {
            res.status(500).json({error: err.message})
        })
})

// new question
app.post('/question/new', (req,res) => {
    const {text, code, language, date} = req.body
    const solutions = []
    const newQuestion = new Questions({text, code, language, date, solutions})
    newQuestion.save()
        .then(response => {
            res.status(201).json(response);
        })
        .catch(err => {
            res.status(500).json({error: err.message})
        })
} )




// solutions
// post a solution for a question with id
app.post('/solution/:id', async(req,res) => {
    const {id} = req.params
    const solution = req.body
    try {
        const question = await Questions.findById(id);

        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        question.solutions.push(solution);
        const updatedQuestion = await question.save();
        res.status(200).json(updatedQuestion);
    } catch (error) {
        console.error('Error adding solution:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})



app.listen(port, () => {
    console.log('Server is running at http://localhost:'+port);
})

