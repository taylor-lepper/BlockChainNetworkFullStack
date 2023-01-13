import axios from "axios";

const connectPeer = async () => {
            try {
                const config = {
                    headers: {
                        "Content-Type": "text/plain",
                    },
                };
                const { data } = await axios.post(
                    `http://localhost:3001/peers/connect`,
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


export default connectPeer;