import axios from 'axios';
import {HttpResponse} from "../models/http.interface";

export const http = {
    get: async (url: string, params?: Record<string, any>): Promise<HttpResponse> => {
        try {
            const response = await axios
                .get(url, { params: params || {} })

            return {
                data: response.data
            };
        } catch (e: any) {
            const {message = 'internal error'} = e;
            throw({message});
        }
    }
}
