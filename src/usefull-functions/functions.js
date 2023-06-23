import axios from "axios";

export const register = async (formData) => {
  console.log(formData);
  let response = await axios({
    method: "POST",
    url: "/user/sign_up", // route to do signup
    data: formData,
  });
  return response;
};

export const login = async (formData) => {
  let response = await axios({
    method: "PUT",
    url: "/user/login",
    data: formData,
  });
  return response;
};

export const logout = () => {
  axios("/user/logout");
  window.location.href = "/";
};

export const getUserFromSession = async () => {
  let response = await axios("/session-info");
  // WE HAVE THE LOGGED IN USER! :)
  if (response.data.session.passport) {
    let user = response.data.session.passport.user;
    return user;
  } else {
    return false;
  }
};
