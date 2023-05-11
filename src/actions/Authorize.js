export const authorize = () => {
  const User_Authorize = JSON.parse(window.localStorage.getItem("currentUser"));
//   console.log(User_Authorize.user_token)
  return User_Authorize.user_token;

};
