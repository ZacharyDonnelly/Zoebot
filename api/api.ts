import axios from "axios";
import "whatwg-fetch";

const API_BASE_URL = "http://127.0.0.1:8000";

export type Message = {
  role: "user" | "assistant";
  content: string;
};

export const getChatHistory = async (
  token: string,
  sessionId: string,
): Promise<Message[]> => {
  const response = await axios.get<{ history: Message[] }>(
    `${API_BASE_URL}/chat/history/${sessionId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return response.data.history;
};

export const createSession = async (token: string): Promise<string> => {
  const response = await axios.post<{ session_id: string }>(
    `${API_BASE_URL}/session`,
    {},
    { headers: { Authorization: `Bearer ${token}` } },
  );
  return response.data.session_id;
};
