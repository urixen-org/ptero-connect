import { api } from "./ApplicationApi.example"; // import the class from the file
// fetch all users from panel
api.getAllUser().then(data => {
    console.log(data); // log output data
}).catch(err => {
    console.error(err); // log error if occurs 
});
//# sourceMappingURL=getAllUser.example.js.map