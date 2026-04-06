import { db } from "../connection/db.js";

export const getAllUsers = (_, res) => {
    console.log("getAllUsers");

    const q = "SELECT * FROM users";

    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.status(200).json(data)
    });
}



export const addUser = (req, res) => {
  console.log("addUser");
  const q =
    "INSERT INTO users(`name`, `last_name`, `age`) VALUES(?)";

  const values = [
    req.body.name,
    req.body.last_name,
    req.body.age,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário criado com sucesso.");
  });
};





export const updateUser = (req, res) => {
  console.log("updateUser");
  const q =
    "UPDATE users SET `name` = ?, `last_name` = ?, `age` = ? WHERE `id` = ?";

  const values = [
    req.body.name,
    req.body.last_name,
    req.body.age,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário atualizado com sucesso.");
  });
};






export const deleteUser = (req, res) => {
  console.log("deleteUser");
  const q = "DELETE FROM users WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário deletado com sucesso.");
  });
};