"use strict";
//* eski kayitlarda olmayan verileri tamamlamak icin sql db yeni bir sütun eklerken default olarak su sekilde olsun diyebiliyorsunuz ama bu mongoDB de mümkün degil o nedenle asagidaki gibi bir script yazmali ve eklemeliyiz

//*örnek  BlogPost collectionss ar icinde key olarak blogCategoryId olmayanlara sonradan bu keyi eklmek icin

//? 1-modelleri buraya cagir
const { BlogCategory, BlogPost } = require("./models/blogModel");

// ?2 - blogCategoryId; ekleme fonksiyonunu yaziyoruz
module.exports = async () => {
    /* BlogCategory */

    // Get first blogCategory:1.blogCategory i getir
    const blogCategory = await BlogCategory.findOne();
    // console.log(blogCategory._id)

    if (blogCategory) {
        const isUpdated = await BlogPost.updateMany(
            {
                //? Filter:
                "blogCategoryId": { $exists: false }, // field yok ise
            },
            {
                //? Update:
                "blogCategoryId": blogCategory._id, // kaydı ata
                // $unset: { "blogCategoryId": 1 } // field sil
            }
        ).catch((err) => console.log(err));
        // console.log(isUpdated)
    }

    // End:
    console.log("* Synchronised *");
    /* Finished */
};

// ?3 - index.js de errorHandler üstünde
//? require('./src/sync')() ile cagirip fonksiyonu calistiriyoruz
