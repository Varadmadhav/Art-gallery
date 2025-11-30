function makeTransactionId() {
  return "TXN_" + Date.now();
}

module.exports = { makeTransactionId };
