import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { WeatherService } from "./weather.service";
import { PolarAreaComponent } from './polar-area/polar-area.component';
import { LineGraphComponent } from './line-graph/line-graph.component';

@NgModule({
    declarations: [AppComponent, PolarAreaComponent, LineGraphComponent],
    imports: [BrowserModule, HttpClientModule],
    providers: [WeatherService],
    bootstrap: [AppComponent]
})
export class AppModule {}
