import { NgModule } from '@angular/core';

import { OnlyNumber } from './Directives/OnlyNumber';
import { OnlyString } from './Directives/OnlyString';

@NgModule({
    declarations: [
        OnlyNumber,
        OnlyString
    ],
    exports: [
        OnlyNumber,
        OnlyString
    ]
})
export class SharedModule { }
