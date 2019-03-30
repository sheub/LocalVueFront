import { checkTokenExists, setToken } from "../helpers/auth";

export const SET_USER_DATA = "SET_USER_DATA";
export const SET_AUTHENTICATED = "SET_AUTHENTICATED";

const fetchUser = () => {
    let url = "/api/me";
    if (process.env.NODE_ENV === "production") {
        url = "/api/me";
    } else { // Dev server runs on port 3000
        url = "http://localhost:5000/api/me";
    }

    return window.axios.get(url)
        .then(({ data: { data } }) => Promise.resolve(data))
        .catch(error => Promise.reject(error));
};

export const setUserData = user => ({
    type: SET_USER_DATA,
    user,
});

export const setAuthenticated = authenticated => ({
    type: SET_AUTHENTICATED,
    authenticated,
});

export const signInUser = credentials => dispatch => {
    var url = "/api/signin";
    if (process.env.NODE_ENV === "production") {
        url = "/api/signin";
    } else { // Dev server runs on port 3000
        url = "http://localhost:5000/api/signin";
    }

    return window.axios.post(url, credentials).then(({ data: { data, meta } }) => {
        setToken(meta.token);
        dispatch(setUserData(data));
        dispatch(setAuthenticated(true));
        return Promise.resolve({ data, meta });
    }).catch(error => {
        return Promise.reject(error);
    });
};

export const googleSignIn = credentials => dispatch => {
    var url =  "/api/google/signin";
    if (process.env.NODE_ENV === "production") {
        url = "/api/google/signin";
    } else { // Dev server runs on port 5000
        url = "http://localhost:5000/api/google/signin";
    }
    return window.axios.post(url, credentials).then(({ data: { data, meta } }) => {
        setToken(meta.token);
        dispatch(setUserData(data));
        dispatch(setAuthenticated(true));
        return Promise.resolve({ data, meta });
    }).catch(error => {
        return Promise.reject(error);
    });
};

export const registerUser = credentials => dispatch => {
    var url = "/api/register";
    if (process.env.NODE_ENV === "production") {
        url = "/api/register";
    } else { // Dev server runs on port 3000
        url = "http://localhost:5000/api/register";
    }

    return window.axios.post(url, credentials
    ).then(({ data: { data, meta } }) => {
        setToken(meta.token);
        dispatch(setUserData(data));
        dispatch(setAuthenticated(true));
        return Promise.resolve({ data, meta });
    }).catch(error => {
        return Promise.reject(error);
    });
};

export const clearAuth = () => dispatch => {
    setToken(null);
    dispatch(setUserData(null));
    dispatch(setAuthenticated(false));
};

export const logoutUser = cb => dispatch => {
    var url = "/api/logout";
    if (process.env.NODE_ENV === "production") {
        url = "/api/logout";
    } else { // Dev server runs on port 5000
        url = "http://localhost:5000/api/logout";
    }
    const request =  window.axios.post(url);

    return request.then(
        response => dispatch(clearAuth()), cb(),
        err => dispatch(clearAuth()), cb()
    );

    // return window.axios.post("https://localvue.de/api/logout")
    //   .then(response => {
    //     dispatch(clearAuth());
    //     cb();
    //   })
    //   .catch(anyError => {
    //     dispatch(clearAuth());
    //     cb();
    //   });
};



export const initAuthFromExistingToken = (cb) => dispatch => {
    checkTokenExists().then(token => {
        setToken(token);
        fetchUser().then(data => {
            dispatch(setUserData(data));
            dispatch(setAuthenticated(true));
            cb();
        }).catch(anyError => {
            dispatch(clearAuth());
            cb();
        });
    }).catch(anyError => {
        dispatch(clearAuth());
        cb();
    });
};
