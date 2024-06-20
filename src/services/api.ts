import axios from "axios";

const API_URL = `http://95.217.134.12:4010/create-pdf?apiKey=${process.env.REACT_APP_API_KEY}`;

export const convertTextToPDF = async (text: string): Promise<Blob> => {
  const response = await axios.post(
    API_URL,
    { text },
    {
      responseType: "blob",
    }
  );

  return response.data;
};
