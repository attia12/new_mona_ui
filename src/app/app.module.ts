
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FrontModule} from "./front/front.module";
import {ToastrModule} from "ngx-toastr";
import {HttpClientModule} from "@angular/common/http";

import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {NgxStarRatingModule} from "ngx-star-rating";
import {LottieModule} from "ngx-lottie";
import player from "lottie-web";
export function playerFactory() {
  return player;
}
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    AppRoutingModule,
    FrontModule,
    ToastrModule.forRoot({
      progressBar: true,
      closeButton: true,
      newestOnTop: true,
      positionClass: 'toast-bottom-right',
      timeOut: 3000

    }),
    HttpClientModule,
    NgxStarRatingModule,
    LottieModule.forRoot({ player: playerFactory })



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
