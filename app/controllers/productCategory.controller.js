const db = require("../models");
const ProductCategory = db.productCategories;
const Op = db.Sequelize.Op;

//Create and Save a new Product Category

exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Product Category
    const productCategory = {
      name: req.body.name,
      description: req.body.description      
    };
  
    // Save Product Category in the database
    ProductCategory.create(productCategory)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Product Category."
        });
      });
  };

//Retrieve all Product Categories/ find by name from the database

exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  
    ProductCategory.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving product categories."
        });
      });
  };

// Find a single Product Category with an id

exports.findOne = (req, res) => {
    const id = req.params.id;
  
    ProductCategory.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Product Category with id=" + id
        });
      });
  };

// Update a Product Category identified by the id in the request

exports.update = (req, res) => {
    const id = req.params.id;
  
    ProductCategory.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Product Category was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Product Category with id=${id}. Maybe Product Category was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Product Category with id=" + id
        });
      });
  };

// Delete a Product Category with the specified id

exports.delete = (req, res) => {
    const id = req.params.id;
  
    ProductCategory.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Product Category was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Product Category with id=${id}. Maybe Product Category was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Product Category with id=" + id
        });
      });
  };

// Delete all Product Categories from the database

exports.deleteAll = (req, res) => {
    ProductCategory.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Product Categories were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all product categories."
        });
      });
  };

// Get the Products for a given Product Category

exports.findProductCategoryById = (req, res) => {
    const id = req.params.id;
  
    ProductCategory.findByPk(id, { include: ["products"] })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Product Category with id=" + id
        });
      });
  };

// Get all Product Categories include Products

exports.findCategoriesAndProducts = (req, res) => {    
      
    ProductCategory.findAll({ include: ["products"]})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving product categories and products."
        });
      });
  };  