const express = require("express");
// file system unshdag node iin san ym users.json gesen datag ene js ruu holbono
const fs = require("fs");
const cors = require("cors");
const app = express();

app.use(cors()); // serveriin dataag haanaas ch awch bolno zowshoorch bn gesen tomyo
// Ene n json dataag object bolgoj baigaa helber use(express.json)
app.use(express.json());

// const users = [
//   { id: 1, name: "bataa", age: 20 },
//   { id: 2, name: "nataa", age: 200 },
// ];

app.get("/users", (req, res) => {
  // { encoding: "utf8" } ene bicgiig neg usgeer tanina gesn ug
  // readFilesync gedeg n unshsan filaa butsaa gesen ug
  // readFile gesen function baiwal 3 parametr baina ucir 1 paraametr unshih link, 1 parametr usgiig neg useg bolgoh 3parametr callback function bn herew unshwal yu butsaah we geh med oruulna

  const data = fs.readFileSync("./users.json", { encoding: "utf8" });
  console.log("data", data);
  const objectData = JSON.parse(data);
  console.log("data object", objectData);
  res.status(200).json({ ilgeehData: objectData.users });

  // res.status(200).json({ users: users });
});

app.post("/users", (req, res) => {
  console.log("body", req.body);
  const data = fs.readFileSync("./users.json", { encoding: "utf8" });
  const { users } = JSON.parse(data);

  const newUsers = {
    id: users.length + 1,
    // firstname: req.body.firstname,
    // lastname: req.body.lastname,
    // email: req.body.email,
    // position: req.body.position,
    // profileImg: req.body.profileImg,
    ...req.body, //spead operator users ii body newUser ii body adilhan bn gewel ene operator ashigln
  };

  users.push(newUsers);
  fs.writeFileSync("./users.json", JSON.stringify({ users }));
  console.log("users", users);
  res.status(201).json({ IlgeehShineData: newUsers });
});

app.put("/users/:userId", (req, res) => {
  console.log("params", req.params);
  console.log("body", req.body);
  const data = fs.readFileSync("./users.json", { encoding: "utf8" });
  const { users } = JSON.parse(data);

  const findIndex = users.findIndex(
    (user) => user.id === parseInt(req.params.userId)
  );
  if (findIndex > -1) {
    users[findIndex].firstname = req.body.firstname;
    fs.writeFileSync("./users.json", JSON.stringify({ users }));
    res.status(200).json({ mess: users[findIndex] });
  } else {
    res.status(400).json({ message: "Not found user id" });
  }
});

app.delete("/users/:userId", (req, res) => {
  const data = fs.readFileSync("./users.json", { encoding: "utf8" });
  const { users } = JSON.parse(data);
  const findIndex = users.findIndex(
    (user) => user.id === parseInt(req.params.userId)
  );
  if (findIndex > -1) {
    const deletedUser = users.splice(findIndex, 1);
    fs.writeFileSync("./users.json", JSON.stringify({ users }));
    res.status(200).json({ user: deletedUser[0] });
  } else {
    res.status(400).json({ message: "Not found user id" });
  }
});

app.listen(8000, () => {
  console.log("Server is running at localhost:8000");
});
