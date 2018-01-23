import { ADD_PLACE, DELETE_PLACE } from '../actions/actionTypes'

const initialState = {
  places: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      return {
        ...state,
        places: state.places.concat({
          key: Math.random(),
          name: action.placeName,
          location: action.location,
          image: {
            uri: action.image.uri,
            height: 30,
            width: 30
          }
        })
      };
    case DELETE_PLACE:
      return {
        ...state,
        places: state.places.filter(p => p.key !== action.placeKey)
      };
    default: return state;
  }
};

export default reducer