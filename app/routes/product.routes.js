module.exports = app => {
    const products = require("../controllers/product.controller.js");
  
    var router = require("express").Router();
    var route = require("express").Router(); 
    const upload = require("../middleware/upload"); 
  
    // Create a new Product
    router.post("/", upload.single('image'), products.create);  
      
    // Retrieve all Products
    router.get("/", products.findAll);  
    
    // Retrieve a single Product with id
    router.get("/:id", products.findOne);    
  
    // Update a Product with id
    router.put("/:id", products.update);
  
    // Delete a Product with id
    router.delete("/:id", products.delete);
  
    // Delete all Products
    router.delete("/", products.deleteAll);

    // Retrieve Product for a give product id
    route.get("/:id", products.findProductById);

    // Get all Products include Category
    route.get("/", products.findProductsAndCategories);
  
    app.use('/api/products', router);
    app.use('/api/proCategories', route);
    
  };