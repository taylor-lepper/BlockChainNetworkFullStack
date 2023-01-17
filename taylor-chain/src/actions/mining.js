import axios from "axios";

const mining = async (type, address) => {
    

    if(type === "job"){
      
        try {
            let url =  `http://localhost:3001/mining/job`;
            const body = JSON.stringify({ address: address });
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
            return err.response.data;
          }
    }

    if(type === "submit"){   
     
            try {
                let url =  `http://localhost:3001/mining/submitBlock`;
                const body = JSON.stringify({ address: address });
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
                if(err.message!== "Request failed with status code 400"){return err.message;}

                return err.response.data;
            }
    }
	

  
};

export default mining;
