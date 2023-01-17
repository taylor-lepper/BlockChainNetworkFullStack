import axios from "axios";

const transaction = async (type, from, recipient, amount, gas) => {

  if (type === "new") {
  try {
   
      let url = `http://localhost:3001/transactions/create`;
      const body = JSON.stringify({ from: from, recipient: recipient, amount: amount, gas: gas });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(url, body, config);
      if (data) {
        return data;
      } else {
        return "Database Error";
      }
   
  } catch (err) {
    console.log(err);
    return err.response.data;
  }
}
};

export default transaction;
