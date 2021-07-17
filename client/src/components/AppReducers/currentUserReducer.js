// temporary user id until we get backend
const initialState = { userId: 37, profile_picture_url: 'https://cdn.vox-cdn.com/thumbor/fCzD8UK6LfjewKWOCwd6AXel9Xo=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/21967491/CP3xLakers.jpg' };

const currentUser = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { userId: action.userId, profile_picture_url: action.profile_picture_url };
    default:
      return state;
  }
};

export default currentUser;
