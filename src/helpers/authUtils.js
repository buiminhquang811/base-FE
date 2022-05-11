
const isUserAuthenticated = () => {
    const user = getLoggedInUser();
    if (!user) return false
    return true
}

const getLoggedInUser = () => {
    const userToken = localStorage.getItem("authtoken");
    if (!userToken) {
        return false;
    }
    return true;
    // const decoded = jwtDecode(userToken);
    // return decoded;
    // const cookies = new Cookies(); s
    // const user = cookies.get("user");
}

export { getLoggedInUser, isUserAuthenticated };