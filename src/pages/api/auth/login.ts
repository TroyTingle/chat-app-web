import type {NextApiRequest, NextApiResponse} from 'next'
import { api } from "@/config/axiosConfig";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { username, password } = req.body;
    await api.post("/api/auth/login", { username, password }).then((response) => {
        res.status(response.status);
    }).catch((response) => {
        console.error(response);
        res.status(response.status);
    })
}