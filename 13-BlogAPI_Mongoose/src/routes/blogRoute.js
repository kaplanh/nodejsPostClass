"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */
//? 1-router i cagiriyoruz
const router = require("express").Router();
// ?2-controllerlari buraya cagiriyorum
// Call Controllers:
const { BlogCategory, BlogPost } = require("../controllers/blogController");
// ?3-router.route() lari yaziyoruz
// ------------------------------------------
// BlogCategory
// ------------------------------------------
router.route("/category").get(BlogCategory.list).post(BlogCategory.create);

router
    .route("/category/:categoryId")
    .get(BlogCategory.read)
    .put(BlogCategory.update)
    .delete(BlogCategory.delete);

// ------------------------------------------
// BlogPost
// ------------------------------------------
router.route("/post").get(BlogPost.list).post(BlogPost.create);

router
    .route("/post/:postId")
    .get(BlogPost.read)
    .put(BlogPost.update)
    .delete(BlogPost.delete);


// bu formatta birsey gelirse bu category nin post larini bana listele
router.get("/category/:categoryId/posts", BlogPost.listCategoryPosts);

module.exports = router;
