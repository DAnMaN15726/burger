const express = require("express");
const router = express.Router();


const burger = require("../models/burger.js");



router.get("/", function(req, res){
    burger.all(function(data){
        let hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        // console.log(hbsObject.burgers[0].devoured);
        res.render("index", hbsObject);
    });
});

router.post("/api/burgers", function(req, res){
    console.log(req.body)
    burger.insert(["burger_name", "devoured"], [req.body.burger_name, 0], function(result){
        res.json({ id: result.insertId});
    });
    
});

router.put("/api/burgers/:id", function(req, res){
    const condition = `id = ${req.params.id}`;
    console.log(`condition, ${condition}`);

    burger.update(
        {
            devoured: req.body.devoured
        },
        condition,
        function(result){
            if (result.changedRows === 0){
                return res.status(404).end();
            }


            res.status(200).end();
        }
    );

});
















module.exports = router;