import { Emoji } from '../types';
import axios from '../utils/axios'

export const all = async ({ id }: { id: number | null }) => {
  const response = await axios.get(`/message/${id}/all/`, {
    params: {
      limit: 50
    }
  });
  return response.data;
};

export const send = async ({ id, body }: { id: number | null, body: string }) => {
    const formData = new FormData();
    formData.append("body", body);


    const response = await axios.post(`/message/${id}/create/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};
  
export const seen = async ({ id, conversationId }: { id: number | null, conversationId: number | null }) => {

  const response = await axios.post(`/message/${conversationId}/seen/${id}`);
  return response.data;
};
  
export const reaction = async ({ id, conversationId, emoji }: { id: number | null, conversationId: number | null, emoji: Emoji }) => {

  const response = await axios.post(`/message/${conversationId}/reaction/${id}`, {
    emoji: emoji
  });
  return response.data;
};
  