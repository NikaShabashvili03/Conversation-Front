import axios from '../utils/axios'

export const login = async ({ email, password }: { email: string, password: string }) => {
  const response = await axios.post(`/user/login/`, { email: email, password: password });
  return response.data;
};

export const register = async ({ email, password, firstname, lastname }: { email: string, password: string, firstname: string, lastname: string }) => {
  const response = await axios.post(`/user/register/`, { email: email, password: password, firstname: firstname, lastname: lastname });
  return response.data;
};

export const fetchProfile = async () => {
  const response = await axios.get(`/user/profile/`,);
  return response.data;
};

export const logout = async () => {
  await axios.post(`/user/logout/`, {});
};
