import client from "@/lib/db";

export const getUserFromDb = (email: string) => {
  const user = client.db("aiNotes").collection("users").findOne({
    email,
  });
  return user;
};
