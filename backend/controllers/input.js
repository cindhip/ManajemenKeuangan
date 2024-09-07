const InputSchema = require("../models/inputModel")

exports.addInput = async (req, res) => {
    const {name, address, category,  expense, incom, phone} = req.body
    
    const input = InputSchema({
        name,
        address,
        category,
        phone,
        expense, 
        incom,
        
    })
    try{
        //validation
        if(!name || !address){
            return res.status(400).json({message: 'All fields are required'})
        }
        await input.save()
        res.status(200).json({message: 'Anggota Add'})
    } catch (error) {
        res.status(500).json({message: 'Error'})
    }


    console.log(input)
}

exports.getInput = async (req, res) => {
    try {
        const inputs = await InputSchema.find().sort()
        res.status(200).json(inputs)
    } catch (error) {
        res.status(500).json({message: 'Error'})
    }
}
exports.deleteInput = async (req, res) =>{
    const {id} = req.params;
    InputSchema.findByIdAndDelete(id)
        .then((input) =>{
            res.status(200).json({message: 'input Deleted'})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Error'})
        })
}

exports.putInput = async (req, res) =>{
    const {id} = req.params;
    const updated = req.body;
    InputSchema.findByIdAndUpdate(id, updated)
        .then((input) =>{
            res.status(200).json({message: 'input Edit'})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Error'})
        })
}