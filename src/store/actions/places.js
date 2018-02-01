import { SET_PLACES, REMOVE_PLACE } from "./actionTypes";
import { uiStartLoading, uiStopLoading } from "./index";

export const addPlace = (placeName, location, image) => {
  return dispatch => {
    dispatch(uiStartLoading());
    fetch(
      "https://us-central1-my-project-1485530647486.cloudfunctions.net/storeImage",
      {
        method: "POST",
        body: JSON.stringify({
          image: image.base64
        })
      }
    )
      .then(res => res.json())
      .then(parsedResp => {
        const placeData = {
          name: placeName,
          location,
          image: parsedResp.imageUrl
        };
        return fetch(
          "https://my-project-1485530647486.firebaseio.com/places.json",
          {
            method: "POST",
            body: JSON.stringify(placeData)
          }
        )
          .catch(err => {
            console.log(err);
            dispatch(uiStopLoading());
          })
          .then(res => res.json())
          .then(parsedRes => {
            console.log(parsedRes);
            dispatch(uiStopLoading());
          });
      })
      .catch(err => {
        dispatch(uiStopLoading());
        console.log(err);
      });
  };
};

export const deletePlace = key => {
  return dispatch => {
    dispatch(removePlace(key));
    return fetch(
      `https://my-project-1485530647486.firebaseio.com/places/${key}.json`,
      {
        method: "DELETE"
      }
    )
      .then(resp => resp.json())
      .then(parsedResp => {
        console.log(parsedResp);
      })
      .catch(err => console.log("oops, couldn't delete"));
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
    return fetch("https://my-project-1485530647486.firebaseio.com/places.json")
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
  };
};

export const setPlaces = places => {
  return {
    type: SET_PLACES,
    places: places
  };
};

// export const deletePlace = key => {
//   return {
//     type: DELETE_PLACE,
//     placeKey: key
//   };
// };
