import * as Keychain from 'react-native-keychain';

export const loginService = async (email, password) => {

    // api call 
    
    if(email === "test@test.com" && password === "12345"){
        try {
        const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJuYW1lIjoidGVzdCB0ZXN0IiwiaWF0IjoxNTE2MjM5MDIyfQ.Lk-OGxgJPbOHDxnzYkXyTUt6NZlHOqgcSlLQvL3Togc";
        await Keychain.setGenericPassword(email, jwt);
        let u = await retriveUser();
        return "Successfully Logged In "+ u;
        }
        catch(err){
            console.log(err)
        }
    }
    else {
        return "Credential are not correct"
    }
}

const retriveUser = async () => {
    try {
        const credentials = await Keychain.getGenericPassword();
        console.log(credentials)
        return credentials.username
    }
    catch (err) {
        console.log(err);
    }
}