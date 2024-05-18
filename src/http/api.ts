import httpService from "./http";


// 引入类型定义
export interface StockPrice {
    Code: string;
    Name: string;
    Price: number;
}

export interface StockPriceAndHistory {
    Code: string;
    Name: string;
    Price: number;
    History: number[];
}

// 封装getMarketPrice接口
function getMarketPrice(): Promise<StockPriceAndHistory[]> {
    return new Promise((resolve, reject) => {
        httpService.get<StockPrice[]>('/getMarketPrice').then((response) => {
            const stockPricePromises = response.map((stock) => {
                return getStockPrice(stock.Code).then((priceHistory) => {
                    return {
                        ...stock,
                        History: priceHistory,
                    };
                });
            });

            Promise.all(stockPricePromises).then((stockPriceAndHistory) => {
                resolve(stockPriceAndHistory);
            }).catch((error) => {
                reject(error);
            });
        }).catch((error) => {
            reject(error);
        });
    })
}

// 封装getStockPrice接口
function getStockPrice(code: string): Promise<number[]> {
    return httpService.get<number[]>(`/getStockPrice?code=${code}`);
}

export interface InventoryItem {
    Code: string;
    Amount: number;
    Total_Cost: number;
    AVG_Cost: number;
}

// 封装getInventory接口
function getInventory(username: string): Promise<InventoryItem[]> {
    return httpService.get<InventoryItem[]>(`/getInventory?username=${username}`);
}

export interface TradeRecord {
    Amount: number;
    Code: string;
    Direction: 0 | 1; // 0=买入, 1=卖出
    KnockPrice: number;
    No: string;
    Price: number;
    State: number; // 交易状态
    TradeTime: string;
}

function getTradeRecord(username: string): Promise<TradeRecord[]> {
    return httpService.get<TradeRecord[]>(`/getTradeRecord?username=${username}`);
}

function getBalance(username: string): Promise<number> {
    return httpService.get<number>(`/getBalance?username=${username}`);
}

// 定义交易方向
export type TradeDirection = 'buy' | 'sell';

// 交易状态枚举
export enum TradeStatus {
    Error = 0,
    EntrustSuccess = 1,
    TradeSuccess = 2,
    InvalidOrder = 3,
    InsufficientBalance = 4,
    InsufficientPosition = 5,
}

async function tradeStock(username: string, code: string, direction: TradeDirection, price: number, amount: number): Promise<TradeStatus> {
    const directionParam = direction === 'buy' ? '0' : '1'; // 根据direction转换为API需要的参数
    try {
        const response = await httpService.get<TradeStatus>(`/trade?username=${username}&code=${code}&direction=${directionParam}&price=${price}&amount=${amount}`);
        return response;
    } catch (error) {
        console.error('Trade error:', error);
        return TradeStatus.Error; // 出现错误时返回错误状态
    }
}

// 注册用户
function registerUser(username: string, pwd: string): Promise<boolean> {
    return httpService.get<boolean>(`/regist?username=${username}&pwd=${pwd}`);
}

// 用户登录
function loginUser(username: string, pwd: string): Promise<boolean> {
    return httpService.get<boolean>(`/login?username=${username}&pwd=${pwd}`);
}


// 用户注销
function logoutUser(username: string): Promise<boolean> {
    return httpService.get<boolean>(`/logout?username=${username}`);
}

export default {
    getMarketPrice,
    getStockPrice,
    getInventory,
    getTradeRecord,
    getBalance,
    tradeStock,
    registerUser,
    loginUser,
    logoutUser,
};