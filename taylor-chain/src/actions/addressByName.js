import axios from "axios";

const addressByName = async (name) => {
            try {
                const config = {
                    headers: {
                        "Content-Type": "text/plain",
                    },
                };
                const { data } = await axios.get(
                    `http://localhost:3001/wallet/name/${name}`,
                    {name: name},
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


export default addressByName;