const router = require("express").Router();

const Todo = require("./todo.model");

router.get("/", async (req, res) => {
    // const data = await Todo.findAll()
    const data = await Todo.findAndCountAll();
    res.status(200).send({
        error: false,
        result: data,
    });
});
router.post("/", async (req, res) => {
    // const data = await Todo.findAll()
    const data = await Todo.create(req.body);
    res.status(201).send({
        error: false,
        body: req.body,
        message: "created",
        result: data,
    });
});

module.exports = router;
