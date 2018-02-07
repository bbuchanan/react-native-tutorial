import { AsyncStorage } from "react-native";

import { TRY_AUTH, AUTH_SET_TOKEN } from "./actionTypes";
import { uiStartLoading, uiStopLoading } from "./index";
import startMainTabs from "../../screens/MainTabs/startMainTabs";

export const tryAuth = (authData, authMode) => {
  return dispatch => {
    dispatch(uiStartLoading());
    const apiKey = "AIzaSyAWC9lIu6WENu40Vd1y6IZnNCwnsaqY2YM";
    let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${apiKey}`;
    if (authMode == "signup") {
      url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${apiKey}`;
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .catch(err => {
        console.log(err);
        alert("Authentication failed, try again.");
        dispatch(uiStopLoading());
      })
      .then(res => res.json())
      .then(parsedRes => {
        dispatch(uiStopLoading());
        if (!parsedRes.idToken) {
          alert("Authentication failed, try again.");
        } else {
          dispatch(authStoreToken(parsedRes.idToken));
          startMainTabs();
        }
      });
  };
};

export const authSignup = authData => {
  return dispatch => {};
};

export const authStoreToken = token => {
  return dispatch => {
    dispatch(authSetToken(token));
    AsyncStorage.setItem("ap:auth:token", token);
  };
};

export const authSetToken = token => {
  return {
    type: AUTH_SET_TOKEN,
    token: token
  };
};

export const authGetToken = () => {
  return (dispatch, getState) => {
    const promise = new Promise((resolve, reject) => {
      const token = getState().auth.token;
      if (!token) {
        AsyncStorage.getItem("ap:auth:token")
          .then(tokenFromStorage => {
            if (!tokenFromStorage) {
              reject();
              return;
            }
            dispatch(authSetToken(tokenFromStorage));
            resolve(tokenFromStorage);
          })
          .catch(err => reject());
      } else {
        resolve(token);
      }
    });

    return promise;
  };
};

export const authAutoSignIn = () => {
  return dispatch => {
    dispatch(authGetToken())
      .catch(err => console.log(err))
      .then(token => {
        startMainTabs();
      });
  };
};
