var Userdb = require('../model/model');

//create aand save new user

exports.create=(req,res)=>{
    //validate request
    if(!req.body){
        res.status(400).send({message:"Content cannot be empty!"})
        return;
    }

    //new user
    const user= new Userdb({
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        status:req.body.status
    })

    //save user in the db

    user
       .save(user)
       .then(data=>{
        //res.send(data)
        res.redirect('/add-user')
       })

       .catch(err=>{
        res.status(500).send({
            message:err.message || "Some error occured while creating a create operation"
        });
       });
}

//retrieve and return all users or single user
exports.find=(req,res)=>{

    if(req.query.id){
      const id=req.query.id;

      Userdb.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message:"Not found the user with id "+id})
            }else{
                res.send(data)
            }
        })
            .catch(err=>{
                res.status(500).send({message:"Error retriving user id "+id})
            })

    }else{
        Userdb.find()
        .then(user=>{
        res.send(user)
    })
        .catch(err=>{
        res.status(500).send({message:err.message|| "Error occur while retriving user information"})
    });
    }

    
}

//update a new identified user by user id
exports.update=(req,res)=>{
    if(!req.body){
        return res
           .status(400)
           .send({message: "Data to be updated cannot be empty"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id,req.body,{ useFindAndModify: false})
       .then(data=>{
        if(!data){
            res.status(404).send({message:`Cannot Update the user with ${id}.Maybe User not found`})
        }else{
            res.send(data)
        }
       })
       .catch(err=>{
        res.status(500).send({message: "Error update user information"})
       })
}

//delete a user with specified user id in the request
exports.delete=(req,res)=>{
    const id =req.params.id;

    Userdb.findByIdAndDelete(id)
      .then(data=>{
        if(!data){
            res.status(404).send({message: `Cannot delete with id ${id}.Maybe id is wrong`})
        }else{
            res.send({message:"User was deleted successfully!"})
        }
      })
      .catch(err=>{
        res.status(500).send({message: "Couldn't delete user with id="+id});
      });


}
