const App = require("./app");

const PORT = process.env.PORT || 3200;

App.listen(PORT, () => {
  console.log("Server is listening at port", PORT);
});
