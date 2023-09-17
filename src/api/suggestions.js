import { repository, mockURL, token } from "./base";

let controllerAdressList = null;

const getAddressList = async (query) => {
  if (controllerAdressList) controllerAdressList.abort();
  controllerAdressList = new AbortController();
 
  const { data } = await repository.post(
    mockURL + "suggestions/api/4_1/rs/suggest/address",
    { query: query },
    {
      signal: controllerAdressList.signal,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Token " + token,
      },
    }
  );

  controllerAdressList = null;
  return data.suggestions;
};

export default {
  getAddressList,
};
