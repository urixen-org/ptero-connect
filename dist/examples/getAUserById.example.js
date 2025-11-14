import { api } from "./ApplicationApi.example";
// get a user by there id from panel
api
    .getAUserById(1)
    .then((data) => console.log(data) /*Log the data*/)
    .catch((err) => console.error(err) /*log if any error occurs */);
//# sourceMappingURL=getAUserById.example.js.map