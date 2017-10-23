import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShortCodeService, DatabaseService } from './shared';
import { HttpModule } from '@angular/http';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ShortUrlComponent } from './short-url/short-url.component';

const appRoutes: Routes = [
  {path: '', component: ShortUrlComponent },
  {path: ':key', component: ShortUrlComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ShortUrlComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpModule
  ],
  providers: [ShortCodeService, DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
