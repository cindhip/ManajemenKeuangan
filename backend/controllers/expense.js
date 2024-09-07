const ExpenseSchema = require("../models/expenseModel")


exports.addExpense = async (req, res) => {
    const {title, amount, category, description, date} = req.body
    
    const expense = ExpenseSchema({
        title,
        amount,
        category,
        description,
        date
    })
    try{
        //validation
        if(!title || !category || !description || !date){
            return res.status(400).json({message: 'All fields are required'})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }
        await expense.save()
        res.status(200).json({message: 'Expense Add'})
    } catch (error) {
        res.status(500).json({message: 'Error'})
    }


    console.log(expense)
}

exports.getExpense = async (req, res) => {
    try {
        const expenses = await ExpenseSchema.find().sort({createdAt: +1})
        res.status(200).json(expenses)
    } catch (error) {
        res.status(500).json({message: 'Error'})
    }
}

exports.deleteExpense = async (req, res) =>{
    const {id} = req.params;
    ExpenseSchema.findByIdAndDelete(id)
        .then((expense) =>{
            res.status(200).json({message: 'Expense Deleted'})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Error'})
        })
}
exports.putExpense = async (req, res) =>{
    const {id} = req.params;
    const updated = req.body;
    ExpenseSchema.findByIdAndUpdate(id, updated)
        .then((expense) =>{
            res.status(200).json({message: 'expense Edit'})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Error'})
        })
}