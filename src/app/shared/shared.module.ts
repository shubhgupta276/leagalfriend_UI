import { NgModule } from '@angular/core';
import { OnlyNumber } from './Directives/OnlyNumber';
import { OnlyString } from './Directives/OnlyString';
import { CustomSingleSelectComponent } from './custom-single-select/custom-single-select.component';
import { CommonModule } from '@angular/common';
import { ClickOutsideModule } from 'ng4-click-outside';

@NgModule({
    imports: [CommonModule, ClickOutsideModule],
    declarations: [
        OnlyNumber,
        OnlyString,
        CustomSingleSelectComponent
    ],
    exports: [
        OnlyNumber,
        OnlyString,
        CustomSingleSelectComponent]
})
export class SharedModule { }
