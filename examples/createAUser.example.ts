import { api } from "./ApplicationApi.example";

// create a user

const userData = {
    email: "test@example.com", // email of the user
    username: "test", // username of the user
    first_name: "test", // first name of the user
    last_name: "example", // last name of the User
    password: "example" // (optional) password of the user
}
api.createUser(userData).then(data => {
    console.log(data) // log the output
})
.catch(err => {
    console.error(err) // log error if occurs
})