import axios from "axios";

const disconnectPeer = async (port) => {
    console.log(port);
            try {
                const config = {
                    headers: {
                        "Content-Type": "text/plain",
                    },
                };
                const { data } = await axios.post(
                    `http://localhost:${port}/peers/disconnect`,
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


export default disconnectPeer;