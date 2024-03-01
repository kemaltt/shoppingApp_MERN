import { publicRequest } from "../constants/api/apiUrl";
import { loginFail, loginStart, loginSuccess, registerFail, registerStart, registerSuccess } from "../redux/authSlice";



export const login = async (dispatch, user) => {
  dispatch(loginStart())
  try {
    const response = await publicRequest.post(`/api/login`, user);
    dispatch(loginSuccess(response.data));
  } catch (error) {
    dispatch(loginFail(error.response.data.message || 'Something went wrong!'))
  }
}

export const register = async (dispatch, user) => {
  dispatch(registerStart())
  try {
    const response = await publicRequest.post(`/api/register`, user);
    dispatch(registerSuccess(response.data));
  } catch (error) {
    dispatch(registerFail(error.response.data.message || 'Something went wrong!'))
  }
}

export const logout = async (dispatch) => {
  dispatch(logout())
}
