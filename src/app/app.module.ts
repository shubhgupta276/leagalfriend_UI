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

@NgModule({
  imports: [
    BrowserModule,
    FeatureShellModule,
    AuthShellModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ApiGateway,
    TokenService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
