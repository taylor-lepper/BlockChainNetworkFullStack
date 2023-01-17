import axios from "axios";

const walletInfo = async (type, privateKey) => {

  if (type === "info") {
  try {
   
      let url = `http://localhost:3001/wallet`;
      const body = JSON.stringify({ privateKey: privateKey });
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
    return err.response.data.message;
  }
}
};

export default walletInfo;
