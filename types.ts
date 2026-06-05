
export enum DeviceMode {
  FACE = 'FACE',      // 脸部模式
  EYE = 'EYE',        // 眼周模式
  INFUSION = 'INFUSION', // 导入模式
  LIFTING = 'LIFTING'   // 提拉模式
}

export interface SkinReport {
  score: number;
  hydration: number;
  elasticity: number;
  oiliness: number;
  advice: string;
}

export interface UserProfile {
  name: string;
  skinType: string;
  streakCount: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  specs: string[];
}

export enum OrderStatus {
  PROCESSING = 'PROCESSING', // 进行中
  COMPLETED = 'COMPLETED',   // 已完成
  REFUNDED = 'REFUNDED'      // 已退款
}

export interface Order {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  status: OrderStatus;
  orderTime: string;
  trackingNumber?: string;
  logistics?: { time: string; status: string }[];
  address?: Address;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  region: string;
  detail: string;
  isDefault: boolean;
}

export interface Activity {
  id: string;
  title: string;
  type: 'online' | 'offline';
  date: string;
  location?: string;
  image: string;
  description: string;
}
