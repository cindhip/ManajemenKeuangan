const {
  addExpense,
  getExpense,
  deleteExpense,
  putExpense,
} = require("../controllers/expense");
const {
  addIncome,
  getIncomes,
  deleteIncome,
  putIncome,
} = require("../controllers/income");
const { addInput, getInput,putInput, deleteInput } = require("../controllers/input");
const { getAdmin } = require("../controllers/admin");
const { login } = require("../controllers/login");

const router = require("express").Router();

router
  .post("/add-income", addIncome)
  .get("/get-income", getIncomes)
  .delete("/delete-income/:id", deleteIncome)
  .put("/put-income/:id", putIncome)
  .post("/add-expense", addExpense)
  .get("/get-expense", getExpense)
  .delete("/delete-expense/:id", deleteExpense)
  .put("/put-expense/:id", putExpense)
  .post("/add-input", addInput)
  .get("/get-input", getInput)
  .put("/put-input/:id", putInput)
  .delete("/delete-input/:id", deleteInput)
  .get("/get-admin", getAdmin)
  .post("/login", login);
module.exports = router;
