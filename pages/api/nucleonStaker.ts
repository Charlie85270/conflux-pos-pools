import nc from "next-connect";
import cors from "cors";

const handler = nc()
  // use connect based middleware
  .use(cors())
  .get(async (req, res) => {
    const response = await fetch(
      "https://mainapi.nucleon.network/api/v1/totalstakers",
      {
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error

        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      }
    );

    console.log(response);

    res.json(await response.json());
  });

export default handler;

export const config = {
  runtime: "edge",
};
