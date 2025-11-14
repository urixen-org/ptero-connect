import { api } from "./ApplicationApi.example";
// get a user by there username from panel
api
    .getAUserByUsername("example")
    .then((data) => console.log(data) /*Log the data*/)
    .catch((err) => console.error(err) /*log if any error occurs */);
//# sourceMappingURL=getAUserByUsername.example.js.map