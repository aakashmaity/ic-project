import { useEffect, useState } from 'react';
import { dbank_backend } from 'declarations/dbank_backend';
import { HashLoader } from 'react-spinners';

function App() {
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(0);
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  
  useEffect(() => {
    updateBalance();
  },[balance])

  async function updateBalance (){
    await dbank_backend.compoundInterest();
    const currentVal = await dbank_backend.checkBalance();
    setBalance(currentVal);

    setLoading(false);
  }

  async function handleTransaction(e){
    e.preventDefault();
    setLoading(true);

    const deposit = parseFloat(depositAmount) || 0;
    const withdraw = parseFloat(withdrawAmount) || 0;

    if(deposit > 0){
      await dbank_backend.deposit(deposit);
    }
    if(withdraw> 0){
      await dbank_backend.withdraw(withdraw);
    }
    updateBalance();
    setDepositAmount("");
    setWithdrawAmount("")

  }

  if(loading){
    return(
      <div className='loading'>
        <HashLoader color="#64c7f5" />
      </div>
    );
  }


  return (
    <div className="container">
      <img src="../public/dbank_logo.png" alt="DBank logo" width="100" />
      <h1>Current Balance: $<span id="value">{Math.round(balance * 100) / 100}</span></h1>
      <div className="divider"></div>
      <form action="#" method='post'>
        <h2>Amount to Deposit</h2>
        <input id="input-amount" type="number" step="0.01" min={0} name="deposit" onChange={(e) => setDepositAmount(e.target.value)} value={depositAmount}/>
        <h2>Amount to Withdraw</h2>
        <input  id="withdrawal-amount" type="number" name="withdraw" step="0.01" min={0} onChange={(e) => setWithdrawAmount(e.target.value)} value={withdrawAmount}/>
        <input onClick={handleTransaction} id="submit-btn" type="submit" value="Finalise Transaction" />
      </form>
    </div>

  );
}

export default App;
