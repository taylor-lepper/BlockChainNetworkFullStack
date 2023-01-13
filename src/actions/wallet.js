import axios from "axios";

const wallet = async (type, port, name) => {
  try {
    if (type === "new") {
      let url = `http://localhost:${port}/wallet/new`;
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
    }
  } catch (err) {
    console.log(err);
  }
};

export default wallet;
