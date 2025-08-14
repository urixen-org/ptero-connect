import { api } from "./ApplicationApi.example" // import the class from the file

// fetch user by there email from panel
api.getAUserByEmail("test@example.com").then(data => {
    console.log(data) // log output data
}).catch(err => {
    console.error(err) // log error if occurs 
})