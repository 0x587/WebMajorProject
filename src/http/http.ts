import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// HttpService类
class HttpService {
    private axiosInstance: AxiosInstance;

    constructor() {
        // 创建axios实例
        this.axiosInstance = axios.create({
            baseURL: 'https://mock.shawnsiu.space', // 你的API基础URL
            headers: {
                'Content-Type': 'application/json',
            },
            // 这里可以添加更多默认配置
        });

        // 响应拦截器
        this.axiosInstance.interceptors.response.use(
            (response: AxiosResponse) => {
                // 处理响应数据
                return response;
            },
            (error) => {
                // 处理响应错误
                return Promise.reject(error);
            }
        );
    }

    // GET请求
    public get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return this.axiosInstance.get<T>(url, config).then(response => response.data);
    }

    // POST请求
    public post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        return this.axiosInstance.post<T>(url, data, config).then(response => response.data);
    }

    // 这里可以添加更多的HTTP方法，如PUT, DELETE等
}

// 实例化并导出HttpService
const httpService = new HttpService();
export default httpService;
