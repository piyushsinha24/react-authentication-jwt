import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if(!config.headers["Authorization"]) {
                    // If the Authorization header doesn't exist
                    config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;    // We are passing the access token which we already have
                }

                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                // If our access token has expired
                const prevRequest = error?.config;
                if(error?.response?.status === 403 && !prevRequest?.sent) {
                    // If our access token has expired
                    // Checking for !prevRequest?.sent ensures that we do not fall in an endless loop because of 403 error
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);   // Making the request again with the new refresh token
                }

                return Promise.reject(error);
            }
        );

        return () => {
            // remove the interceptors
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh]);

    return axiosPrivate;
}

export default useAxiosPrivate;