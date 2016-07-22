import {bootstrap} from "@angular/platform-browser-dynamic";
import {AppComponent} from "../app.component";
import {HTTP_PROVIDERS} from "@angular/http";
/**
 * import "../../../../css/base.css!"; webpack无法识别 '!'，systemjs只有加了!才能使用plugin-css识别
 *
*/
import "../../../../css/base.css!";
import "../../../../css/index.css!";
bootstrap(AppComponent, [
    HTTP_PROVIDERS
]);