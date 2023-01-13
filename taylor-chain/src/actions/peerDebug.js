import axios from "axios";

const peerDebug = async () => {
            try {
                const config = {
                    headers: {
                        "Content-Type": "text/plain",
                    },
                };
                const { data } = await axios.get(
                    `http://localhost:3001/peers/debug`,
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


export default peerDebug;