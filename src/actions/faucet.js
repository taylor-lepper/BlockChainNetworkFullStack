import axios from "axios";

const faucet = async (token) => {
    const url = `http://localhost:3001/faucet`;
    const body = JSON.stringify({ token: token });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
   
        try {
            const { data } = await axios.post(url, body, config);
            if (data) {
              return data;
            } else {
              return "Database Error";
            } 
        } catch (err) {
            console.log(err);
    
    }

}
export default faucet;