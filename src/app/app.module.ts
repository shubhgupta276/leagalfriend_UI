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
import { MasterTemplateService } from '../app/feature-shell/master/masterTemplates/masterTemplate.component.service';
import { HttpClientModule } from '@angular/common/http'
import { SharedModule } from './shared/shared.module';
import { LFAuthantication } from './shared/services/lfAuthantication-service';
import { StorageService } from './shared/services/storage.service';
import { Ng2CompleterModule } from 'ng2-completer';
import { BusyModule } from 'angular2-busy';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts/ng2-charts';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AuthShellModule,
    AppRoutingModule,
    Ng2CompleterModule,
    NgxPermissionsModule.forRoot(),
    BusyModule,
    NgbModule.forRoot(),
    HttpClientModule,
    ChartsModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ApiGateway,
    TokenService,
    MasterTemplateService,
    LFAuthantication,
    StorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
