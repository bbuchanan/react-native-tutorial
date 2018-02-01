import { SET_PLACES, REMOVE_PLACE } from "./actionTypes";
import { uiStartLoading, uiStopLoading, authGetToken } from "./index";

export const addPlace = (placeName, location, image) => {
  return dispatch => {
    let authToken;
    dispatch(uiStartLoading());
    dispatch(authGetToken())
      .catch(() => {
        alert("Error getting token");
      })
      .then(token => {
        authToken = token;
        return fetch(
          `https://us-central1-my-project-1485530647486.cloudfunctions.net/storeImage`,
          {
            method: "POST",
            body: JSON.stringify({
              image: image.base64
            }),
            headers: {
              Authorization: "Bearer " + authToken
            }
          }
        );
      })
      .catch(err => {
        console.log(err);
        dispatch(uiStopLoading());
      })
      .then(res => res.json())
      .then(parsedRes => {
        const placeData = {
          name: placeName,
          location: location,
          image: parsedRes.imageUrl
        };
        return fetch(
          `https://my-project-1485530647486.firebaseio.com/places.json?auth=${authToken}`,
          {
            method: "POST",
            body: JSON.stringify(placeData)
          }
        );
      })
      .then(res => res.json())
      .then(parsedRes => {
        console.log(parsedRes);
        dispatch(uiStopLoading());
      })
      .catch(err => {
        console.log(err);
        alert("Something went wrong, please try again!");
        dispatch(uiStopLoading());
      });
  };
};

export const deletePlace = key => {
  return dispatch => {
    dispatch(authGetToken())
      .catch(() => {
        alert("No valid token found");
      })
      .then(token => {
        dispatch(removePlace(key));

        return fetch(
          `https://my-project-1485530647486.firebaseio.com/places/${key}.json?auth=${token}`,
          {
            method: "DELETE"
          }
        )
          .then(resp => resp.json())
          .then(parsedResp => {
            console.log(parsedResp);
          })
          .catch(err => console.log("oops, couldn't delete"));
      });
  };
};

export const removePlace = key => {
  return {
    type: REMOVE_PLACE,
    key
  };
};

export const getPlaces = () => {
  return dispatch => {
    dispatch(authGetToken())
      .then(token => {
        return fetch(
          `https://my-project-1485530647486.firebaseio.com/places.json?auth=${token}`
        )
          .then(res => res.json())
          .then(parsedRes => {
            const places = [];
            for (let key in parsedRes) {
              places.push({
                ...parsedRes[key],
                image: {
                  uri: parsedRes[key].image
                },
                key
              });
            }
            dispatch(setPlaces(places));
          })
          .catch(err => {
            alert("Something went wrong");
            console.log(err);
          });
      })
      .catch(() => {
        alert("No valid token found");
      });
  };
};

export const setPlaces = places => {
  return {
    type: SET_PLACES,
    places: places
  };
};
