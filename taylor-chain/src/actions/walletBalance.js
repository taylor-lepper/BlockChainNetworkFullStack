import axios from "axios";

const walletBalance = async (type, address) => {

  if (type === "balance") {
  try {
   
      let url = `http://localhost:3001/wallet/balance/${address}`;
      const body = JSON.stringify({ address: address });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.get(url, body, config);
      if (data) {
        return data;
      } else {
        return "Database Error";
      }
   
  } catch (err) {
    console.log(err);
    return err.response.data.message;
  }
}

if (type === "allBalances") {
  try {
   
      let url = `http://localhost:3001/wallet/balance/all`;
      const body = JSON.stringify({});
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.get(url, body, config);
      if (data) {
        return data;
      } else {
        return "Database Error";
      }
   
  } catch (err) {
    console.log(err);
    return err.response.data.message;
  }
}

};

export default walletBalance;
