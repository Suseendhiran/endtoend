import express from "express";
import axios from "axios";

const app = express();

let PORT = 3000;

app.listen(PORT, () => {
  console.log(`Listening in port ${PORT}`);
});

app.use(express.json());

class Routes {
  constructor() {
    this.data = {
      data: ["Tamilnadu", "Kerala", "Delhi", "MP"],
    };
  }
  Root(req, res, next) {
    axios
      .get("http://localhost:3000/getstates")
      .then((response) => {
        console.log("root", response);
        res.send({
          states: response.data,
          message:
            "While hitting the Root '/', it will send the data from another route '/getstates'",
        });
      })
      .catch((err) => res.send(err));
  }
  GetStates(req, res) {
    res.send(this.data);
  }
}

let routes = new Routes();

routes.GetStates.bind(routes);
app.get("/", routes.Root);
app.get("/getstates", routes.GetStates.bind(routes));
//app.get("/", routes.GetStates.bind(routes));
