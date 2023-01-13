import axios from "axios";

const explore = async (exploreType, input) => {
    if(exploreType === "blockchain"){
   
            try {
                const config = {
                    headers: {
                        "Content-Type": "text/plain",
                    },
                };
                const { data } = await axios.get(
                    `http://localhost:3001/blockchain`,
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

    if(exploreType === "pending"){
   
        try {
            const config = {
                headers: {
                    "Content-Type": "text/plain",
                },
            };
            const { data } = await axios.get(
                `http://localhost:3001/transactions/pending`,
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

if(exploreType === "confirmed"){
   
    try {
        const config = {
            headers: {
                "Content-Type": "text/plain",
            },
        };
        const { data } = await axios.get(
            `http://localhost:3001/transactions/confirmed`,
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


    if(exploreType === "address"){
        console.log(input);
        try {
            const config = {
                headers: {
                    "Content-Type": "text/plain",
                },
            };
            const { data } = await axios.get(
                `http://localhost:3001/transactions/address/${input}`,
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

    if(exploreType === "index"){
        console.log(input);

            try {
                const config = {
                    headers: {
                        "Content-Type": "text/plain",
                    },
                };
                const { data } = await axios.get(
                    `http://localhost:3001/blockchain/${input}`,
                    {input: input},
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
	

    if(exploreType === "transactionHash"){
        console.log(input);
        try {
            const config = {
                headers: {
                    "Content-Type": "text/plain",
                },
            };
            const { data } = await axios.get(
                `http://localhost:3001/transactions/hash/${input}`,
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

export default explore;
