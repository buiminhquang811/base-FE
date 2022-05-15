import { LOCAL_STORAGE } from "../utils/Constants";

const isUserAuthenticated = () => {
    const user = getLoggedInUser();
    if (!user) return false
    return true
}

const getLoggedInUser = () => {
    const userToken = localStorage.getItem(LOCAL_STORAGE.AUTH_INFO);
    if (!userToken) {
        return false;
    }
    return JSON.parse(userToken);
    // const decoded = jwtDecode(userToken);
    // return decoded;
    // const cookies = new Cookies(); s
    // const user = cookies.get("user");
}

export { getLoggedInUser, isUserAuthenticated };