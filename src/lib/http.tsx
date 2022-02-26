import axios from 'axios';
import {HttpResponse} from "../models/http.interface";

export const http = {
    get: async <T extends unknown>(url: string, params?: Record<string, any>): Promise<HttpResponse<T>> => {
        try {
            const response = await axios
                .get(url, { params: params || {} })

            return {
                data: response.data as T
            };
        } catch (e: any) {
            const {message = 'internal error'} = e;
            throw({message});
        }
    }
}
