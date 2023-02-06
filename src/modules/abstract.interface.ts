
declare type Class<T = any> = new (...args: any[]) => T;

export type  IVerbose = {
  class: Class;
  message: string;
}

export type IDebug  ={
  class: Class;
  message: any;
}
