module.exports = app => {
    const carts = require("../controllers/cart.controller.js");
  
    var router = require("express").Router();

    router.get("/products", carts.getProducts); 
    
    // Retrieve all Carts
    router.get("/:id", carts.findAll); 

    router.post("/", carts.create);

    router.put("/pro/:id", carts.updateAndDelete);

    router.put("/:id", carts.update);

    router.delete("/:id", carts.delete);

    router.delete("/user/:id", carts.deleteAll);
  
    app.use('/api/carts', router);    
    
  };