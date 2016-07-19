/**
*入口文件基类
**/
export class BaseModule {
    public constructor() {
        this.init();
    }
    
    public init() {
        console.log("基类");
    }
}
