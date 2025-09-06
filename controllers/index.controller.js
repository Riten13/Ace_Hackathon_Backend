import { prisma } from "../utils/prismaClient.js";


export const testFunction = async (req, res,) => {
    try {
        const user = await prisma.user.findFirst();
        res.status(200).send({ data: user });
        return;
    } catch (err) {
        console.log(err);
        res.status(500).send({ data: "Something went wrong" });
    }
};