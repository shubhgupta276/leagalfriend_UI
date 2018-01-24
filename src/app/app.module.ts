import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FeatureShellModule } from './feature-shell/feature-shell.module';
import { AuthShellModule } from './auth-shell/auth-shell.module'

@NgModule({
  imports: [
    BrowserModule,
    AuthShellModule,
    FeatureShellModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
