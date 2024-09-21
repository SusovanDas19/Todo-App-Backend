const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { z } = require("zod");
const JWT_SECRET_KEY = "CcbecbbJHBHB152";
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://SDataBase:<password>@cluster0.e7czw.mongodb.net/Todo-app-database");


const app = express();
const { UserModel, TodoModel } = require("./dataBase"); //importing models

app.use(express.json());

const validBody = z
    .object({
        email: z.string().min(5).max(20).email(),
        name: z.string().min(3).max(30),
        password: z
            .string()
            .min(8, { message: 'Password must be at least 8 characters long.' })
            .max(20, { message: 'Password must not exceed 20 characters.' })
            .refine((password) => /[A-Z]/.test(password), {
                message: 'Password must contain at least one uppercase letter.',
            })
            .refine((password) => /[a-z]/.test(password), {
                message: 'Password must contain at least one lowercase letter.',
            })
            .refine((password) => /[0-9]/.test(password), {
                message: 'Password must contain at least one number.',
            })
            .refine((password) => /[!@#$%^&*]/.test(password), {
                message: 'Password must contain at least one special character.',
            }),
        confirmPassword: z.string()
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match.',
        path: ['confirmPassword'],
    });



app.post("/signup", async function (req, res) {
    const validationResult = validBody.safeParse(req.body);

    if (!validationResult.success) {
        res.send({
            message: "Invalid input",
            error: validationResult.error
        });
        return;
    }

    //If everything is ok then it reach here
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    const errorThrow = false;
    try {
        const hashedpassword = await bcrypt.hash(password, 4);
        await UserModel.create({
            email: email,
            password: hashedpassword,
            name: name
        });
    } catch (e) {
        message.send({
            message: e
        })
        errorThrow = true;
    }

    if (!errorThrow) {
        res.send({
            message: "You are signup"
        });
    }

})

app.post("/signin", async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserModel.findOne({
        email: email
    });

    if (!user) {
        res.send({
            message: "Please sign up"
        })
        return;
    }

    const response = await bcrypt.compare(password, user.password);


    if (response) {
        const token = jwt.sign({
            userId: user._id.toString()

        }, JWT_SECRET_KEY)

        res.send({
            token: token
        })
    }
    else {
        res.status(403).send({
            message: "Invalid email and password"
        })
    }
})

app.post("/todo", auth, async function (req, res) {
    const userId = req.userId;
    const task = req.body.task;
    const done = req.body.done;

    await TodoModel.create({
        task: task,
        done: done,
        userId: userId
    })

    res.send({
        message: "New task added"
    })

})

app.get("/todos", auth, async function (req, res) {
    const userId = req.userId;
    const user = await TodoModel.find({
        userId: userId
    })

    if (user) {
        res.send({
            tasks: user.map(todo => ({
                task: todo.task,
                done: todo.done
            }))
        })
    }
    else {
        res.status(403).send({
            message: "Invalid user"
        })
    }
})

function auth(req, res, next) {
    const token = req.headers.token;

    const response = jwt.verify(token, JWT_SECRET_KEY);

    if (response) {
        req.userId = response.userId;
        next();
    } else {
        res.status(403).json({
            message: "Incorrect creds"
        })
    }
}

app.listen(3000);
