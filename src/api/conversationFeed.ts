import axios from '../utils/axios'

export const all = async ({ isGroup }: { isGroup: boolean }) => {
  const response = await axios.get(`/conversation/list/`, { 
    params: {
        isGroup: isGroup
    }
  });
  return response.data;
};