const db = require("../models");
const Cart = db.carts;

exports.findAll = (req, res) => {
    const id = req.params.id;
    Cart.findAll({
        where: {userId: id},
        include: ["product"]        
    }).then((cartItems) => {
        res.json(cartItems)
    }).catch((err) => {
        res.send(err)
    })
};

exports.create = (req,res) =>{ 
    
    let quantity = req.body.quantity 
   
    let cart = {        
        userId: req.body.userId,
        productId: req.body.productId,
        quantity           
      };

    if(req.body.id == null || ""){
        Cart.create(cart)
      .then(data => {          
        res.send(data);      
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while adding the Cart."
        });
      });
    }else {
        const id = req.body.id;       

        Cart.update(req.body, {
            where: { id: id}
        })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: "Cart was updated successfully."
                    });
                } else {
                    res.send({
                        message: `Cannot update Cart with id=${id}. Maybe Cart was not found or req.body is empty!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error updating Cart with id=" + id
                });
            });
    }
      
       
        
};

exports.updateAndDelete = (req,res) => {
  const id = req.params.id;
  if(req.body.quantity == 0 ){
    Cart.destroy({
      where: { productId: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Cart was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Cart with id=${id}. Maybe Cart was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Cart with id=" + id
        });
      });
  }else {
    Cart.update(req.body, {
      where: { productId: id }
  })
      .then(num => {
          if (num == 1) {
              res.send({
                  message: "Cart was updated successfully."
              });
          } else {
              res.send({
                  message: `Cannot update Cart with id=${id}. Maybe Cart was not found or req.body is empty!`
              });
          }
      })
      .catch(err => {
          res.status(500).send({
              message: "Error updating Cart with id=" + id
          });
      });
  }
};

exports.update = (req, res) => {

    const id = req.params.id;

    Cart.update(req.body, {
        where: { productId: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Cart was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Cart with id=${id}. Maybe Cart was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Cart with id=" + id
            });
        });
};

exports.delete = (req, res) => {

    const id = req.params.id;

    Cart.destroy({
        where: { productId: id }
      })
        .then(num => {
          if (num == 1) {
            res.send({
              message: "Cart was deleted successfully!"
            });
          } else {
            res.send({
              message: `Cannot delete Cart with id=${id}. Maybe Cart was not found!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "Could not delete Cart with id=" + id
          });
        });
  
};

exports.deleteAll = (req, res) => {

    const id = req.params.id;

    Cart.destroy({
        where: { userId: id }
      })
        .then(num => {
          if (num == 1) {
            res.send({
              message: "Cart was deleted successfully!"
            });
          } else {
            res.send({
              message: `Cannot delete Cart with id=${id}. Maybe Cart was not found!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "Could not delete Cart with id=" + id
          });
        });
  
};