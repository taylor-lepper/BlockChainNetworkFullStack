import axios from "axios";

const address = async (port) => {
            try {
                const config = {
                    headers: {
                        "Content-Type": "text/plain",
                    },
                };
                const { data } = await axios.get(
                    `http://localhost:${port}/wallet/address`,
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


export default address;