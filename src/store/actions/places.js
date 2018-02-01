import { ADD_PLACE, DELETE_PLACE } from "./actionTypes";

export const addPlace = (placeName, location, image) => {
  return dispatch => {
    const placeData = {
      name: placeName,
      location
    };
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
        console.log(parsedResp);
      })
      .catch(err => {
        console.log("got here");
        console.log(err);
      });

    // fetch("https://my-project-1485530647486.firebaseio.com/places.json", {
    //   method: "POST",
    //   body: JSON.stringify(placeData)
    // })
    //   .catch(err => console.log(err))
    //   .then(res => res.json())
    //   .then(parsedRes => {
    //     console.log(parsedRes);
    //   });
  };
};

export const deletePlace = key => {
  return {
    type: DELETE_PLACE,
    placeKey: key
  };
};
