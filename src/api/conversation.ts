import axios from '../utils/axios'

export const get = async ({ id }: { id: number | null }) => {
  const response = await axios.get(`/conversation/list/${id}/`);
  return response.data;
};

