const initialState = {
  userData: {
    user_id: 0,
    profile_picture_url: 'https://cdn.vox-cdn.com/thumbor/fCzD8UK6LfjewKWOCwd6AXel9Xo=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/21967491/CP3xLakers.jpg',
    address: {
      coordinate: '(-83.0609736,42.5843253)',
    },
  },
};

const currentUser = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        userData: action.userData,
      };
    default:
      return state;
  }
};

export default currentUser;
