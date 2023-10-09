const router = require("express").Router();

const Todo = require("./todo.model");

// NOT:Todo modelimin methodlari async oldugu icin burdaki metodlarda async olmak zorunda
// Not:sequelize methodlari hata döndürmüyor biz kendimiz yazmaliyiz

// not:model sayesinde biz modelde olmayan bir veriyi göndersek bile bu veri db ye kayit edilmeyecektir

module.exports = router;

//? LIST:
// status 200 OK
router.get("/", async (req, res) => {
    // const data = await Todo.findAll()
    const data = await Todo.findAndCountAll();
    res.status(200).send({
        error: false,
        result: data,
    });
});

//? CREATE:
// status 201 Created
router.post("/", async (req, res) => {
    // normalde kayit islemi bu sekilde yapilir ama biz istedikki veriyi apiden gönderelim o nedenle req.body yazdik
    // const data = await Todo.create({
    //     title: 'Test Title',
    //     description: 'Test Description',
    // })
    console.log(typeof req.body, req.body);
    const data = await Todo.create(req.body);
    res.status(201).send({
        error: false,
        body: req.body, // Send Data-benim gönderdigim veri
        message: "Created",
        result: data, // Receive Data-kayit sonrasi olusan veri
    });
});

// ?READ:
// status 200 OK
router.get("/:id", async (req, res) => {
    // https://sequelize.org/docs/v6/core-concepts/model-querying-finders/

    // *findOne() ile
    // const data = await Todo.findOne({ where: { title:"title": "baslik"} })

    // const data = await Todo.findOne({ where: { id: req.params.id } })

    //*findByPk()ile
    const data = await Todo.findByPk(req.params.id);
    res.status(200).send({
        error: false,
        result: data,
    });
});

//? UPDATE:
// Status: 202 Accepted
// put yerine patch yazarsak patch de yapilmis olur gerekte yok put ile neyi güncellersek o kadarini etkiler zaten
// update() updateMany() gibi calisir kactane bulursa o kadarini günceller
router.put("/:id", async (req, res) => {
    // Model.update({ newData }, { filter })
    const isUpdated = await Todo.update(req.body, {
        where: { id: req.params.id },
    });
    // isUpdated return: [ 1 ] or [ 0 ]
    res.status(202).send({
        error: false,
        body: req.body, // Send Data
        message: "Updated",
        isUpdated: Boolean(isUpdated[0]),
        result: await Todo.findByPk(req.params.id),
    });
});

// ?DELETE:
// Status: 204 No Content basarili
// Status: 404 Not Found bulunamadi basarisiz
router.delete("/:id", async (req, res) => {
    // Model.destroy({ filter })
    const isDeleted = await Todo.destroy({ where: { id: req.params.id } });
    // isDeleted return: 1 or 0
    if (isDeleted) {
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
    // res.status(204).send({
    //     error: false,
    //     message: 'Deleted',
    //     isDeleted: Boolean(isDeleted)
    // })
});
