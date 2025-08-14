import { api } from "./ApplicationApi.example";

api.deleteUser(1 /* user id */).then(data => {
    if(data) {
        console.log("user 1 deleted successfully")
    } else {
        console.error("failed to delete user 1")
    }
}).catch(err => {
    console.error("error deleting user 1", err)
})