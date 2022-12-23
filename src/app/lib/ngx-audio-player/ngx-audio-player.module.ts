import { NgModule ,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AudioPlayerComponent } from './component/ngx-audio-player/ngx-audio-player.component';
import {SecondsToMinutesPipe} from "./pipe/seconds-to-minutes.pipe";
import {MatSliderModule} from "@angular/material/slider";
// import {MatSliderModule} from "@angular/material/slider";
import {BrowserModule} from "@angular/platform-browser";


@NgModule({
  declarations: [SecondsToMinutesPipe, AudioPlayerComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [CommonModule, FormsModule, MatButtonModule, MatCardModule, MatTableModule, MatFormFieldModule, MatExpansionModule, MatPaginatorModule, MatIconModule, FormsModule, BrowserModule, MatSliderModule],
  exports: [AudioPlayerComponent]
})
export class NgxAudioPlayerModule { }
