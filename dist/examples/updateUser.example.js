import { api } from "./ApplicationApi.example";
// update a user details
const updatedData = {
    // data to be updated
    first_name: "example",
};
api
    .updateUser(1, // user id
updatedData)
    .then((data) => console.log(data))
    .catch((err) => {
    console.log(err);
});
//# sourceMappingURL=updateUser.example.js.map