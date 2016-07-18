import '../../../css/index.css';
import {BaseModule} from "../BaseModule";
import {BaseComponent} from "../components/BaseComponent";
 
class Index extends BaseModule {  
    public constructor() {
        super();

        this.initEvent();
        this.initElement();
        new BaseComponent({ data: { hello: "你好" } }).$inject('#module-cnt');
    }
    private initEvent() {
        console.log("init events...");
    }
    private initElement() {
        console.log('init elements...');
    }  
}

new Index(); 