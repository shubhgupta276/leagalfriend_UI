import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FeatureShellModule } from './feature-shell/feature-shell.module';
import { AuthShellModule } from './auth-shell/auth-shell.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/interceptor/auth-interceptor';
import { ApiGateway } from './shared/services/api-gateway';
import { TokenService } from './shared/services/token-service';
import {MasterTemplateComponentService} from "../app/feature-shell/master/masterTemplates/masterTemplate.component.service";
import { HttpClientModule } from '@angular/common/http'
import { SharedModule } from './shared/shared.module';
import { LFAuthantication } from './shared/services/lfAuthantication-service';
import { StorageService } from './shared/services/storage.service';
import { Ng2CompleterModule } from "ng2-completer";

import { NgxPermissionsModule } from 'ngx-permissions';
@NgModule({
  imports: [
    BrowserModule,
    FeatureShellModule,
    AuthShellModule,
    AppRoutingModule,
    SharedModule,
    Ng2CompleterModule,
    NgxPermissionsModule.forRoot()
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ApiGateway,
    TokenService,
    MasterTemplateComponentService,
    LFAuthantication ,
    StorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
