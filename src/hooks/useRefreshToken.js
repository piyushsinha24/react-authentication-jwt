import axios from "../api/axios";
import useAuth from "./useAuth";

// Will be called whenever the access token expires
// It will make an api call to the /refresh endpoint and then return the access token that is received as the response to the call.
function useRefreshToken() {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });
    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.accessToken);
      return { ...prev, accessToken: response.data.accessToken };
    });

    return response.data.accessToken;
  };

  return refresh;
}

export default useRefreshToken;
