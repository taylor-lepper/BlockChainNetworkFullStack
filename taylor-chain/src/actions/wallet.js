import axios from "axios";

const wallet = async (type, name) => {

  if (type === "new") {
  try {
   
      let url = `http://localhost:3001/wallet/new`;
      const body = JSON.stringify({ name: name });
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
    if(err.message === "Network Error"){return err.message};
    return err.response.data.message;
  }
}
};

export default wallet;
