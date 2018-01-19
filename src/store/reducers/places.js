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
            uri: "https://inception-app-prod.s3.amazonaws.com/YWE1OGJjMjAtNjkzNS00ZjQxLWE1ZmUtZTM0NDk0YjI1Yjgw/content/2016/10/79f7d0a8d3b1ec81943d0fc829a8aef8.jpg",
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