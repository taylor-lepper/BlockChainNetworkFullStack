import axios from "axios";

const mining = async (type) => {


    if(type === "job"){
        try {
            const config = {
                headers: {
                    "Content-Type": "text/plain",
                },
            };
            const { data } = await axios.get(
                `http://localhost:3001/mining/job`,
                {},
                config
            );
            if (data) {
                return data;
            } else {
                return "Database Error";
            }
        } catch (err) {
            console.log(err);
        }
    }

    if(type === "submit"){   
            try {
                const config = {
                    headers: {
                        "Content-Type": "text/plain",
                    },
                };
                const { data } = await axios.post(
                    `http://localhost:3001/mining/submitBlock`,
                    {},
                    config
                );
                if (data) {
                    return data;
                } else {
                    return "Database Error";
                }
            } catch (err) {
                console.log(err);
            }
    }
	

  
};

export default mining;
