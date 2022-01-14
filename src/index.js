const App = require("./app");

const PORT = App.get("port");

App.listen(PORT, () => {
  console.log("Server is listening at port", PORT);
});
