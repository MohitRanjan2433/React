import { useState, useEffect } from "react";

function App() {
  const [name, setName] = useState("");
  const [datetime, setDatetime] = useState("");
  const [description, setDescription] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0); // State to hold the balance

  function addNewTransaction(e) {
    e.preventDefault();

    const price = parseFloat(name.split(" ")[0]) || 0;

    const newTransaction = {
      price: parseFloat(price), // Ensure price is a number
      name: name.substring(price.length + 1),
      description,
      datetime,
    };

    const updatedTransactions = [...transactions, newTransaction];
    setTransactions(updatedTransactions);
    saveToLocalStorage(updatedTransactions);

    // Update the balance after adding the new transaction
    const updatedBalance = calculateBalance(updatedTransactions);
    setBalance(updatedBalance);

    setName("");
    setDatetime("");
    setDescription("");
  }

  const calculateBalance = (transactions) => {
    return transactions.reduce((acc, transaction) => balance + transaction.price, 0);
  };

  const saveToLocalStorage = (data) => {
    localStorage.setItem("transactions", JSON.stringify(data));
  };

  const retrieveFromLocalStorage = () => {
    const storedTransactions = localStorage.getItem("transactions");
    return storedTransactions ? JSON.parse(storedTransactions) : [];
  };



  useState(() => {
    const storedTransactions = retrieveFromLocalStorage();
    setTransactions(storedTransactions);

    const storedBalance = calculateBalance(storedTransactions);
    setBalance(storedBalance);
  }, []);


  return (
    <main>
      <h1>
        {balance}
        <span>.00</span>
      </h1>
      <form action="" onSubmit={addNewTransaction}>
        <div className="basic">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={"price and name"}
          />
          <input
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
            type="datetime-local"
          />
        </div>
        <div className="description">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={"description"}
          />
        </div>
        <button type="submit">Add new transaction</button>
      </form>
      <div className="transactions">
        {transactions.length > 0 &&
          transactions.map((transaction, index) => (
            <div key={index} className="transaction">
              <div className="left">
                <div className="name">{transaction.name}</div>
                <div className="description">{transaction.description}</div>
              </div>
              <div className="right">
                {/* console.log(transaction.price); */}
                <div
                  className={
                    "price " + (transaction.price < 0 ? "red" : "green")
                  }
                >
                  {transaction.price}
                </div>
                <div className="datetime">{transaction.datetime}</div>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}

export default App;
