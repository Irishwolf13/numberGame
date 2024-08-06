// types.ts
export interface NumberInfo {
    number: number;
    speed: number;
  }
  
  export interface UserInfo {
    uid: string;
    email: string;
    userName: string;
    reachedNumbers: Array<NumberInfo>;
  }