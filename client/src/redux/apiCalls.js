

import { publicRequest } from "../api/apiUrl";
import { loginFail, loginStart, loginSuccess } from "../redux/UserSlice";

export const login = async (dispatch, user) => {
  dispatch(loginStart())
  try {
    const response = await publicRequest.post(`/api/login`, user);
    dispatch(loginSuccess(response.data));
  } catch (error) {
    dispatch(loginFail(error.response.data.message || 'Something went wrong!'))
  }
}
