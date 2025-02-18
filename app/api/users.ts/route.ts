import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

type User = {
  id: string;
  name: string;
  email: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const usersCol = collection(db, "users");
    const userSnapshot = await getDocs(usersCol);
    const usersList: User[] = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
    res.status(200).json(usersList);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
}
