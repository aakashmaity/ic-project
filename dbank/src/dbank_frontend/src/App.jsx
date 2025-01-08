import { useEffect, useState } from 'react';
import { dbank_backend } from 'declarations/dbank_backend';

function App() {
  const [balance, setBalance] = useState(0);

  async function handleBalance (){
    const currentVal = await dbank_backend.checkBalance();
    setBalance(currentVal);
  }

  useEffect(() => {
    handleBalance();
  },[])

  return (
    <div class="container">
      <img src="dbank_logo.png" alt="DBank logo" width="100" />
      <h1>Current Balance: $<span id="value">{balance}</span></h1>
      <div class="divider"></div>
      <form action="#">
        <h2>Amount to Deposit</h2>
        <input id="input-amount" type="number" step="0.01" min="0" name="deposit" value=""/>
        <h2>Amount to Withdraw</h2>
        <input id="withdrawal-amount" type="number" name="withdraw" step="0.01" min="0" value=""/>
        <input id="submit-btn" type="submit" value="Finalise Transaction" />
      </form>
    </div>

  );
}

export default App;
