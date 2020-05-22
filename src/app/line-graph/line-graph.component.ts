import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Chart } from "chart.js";

@Component({
  selector: 'app-line-graph',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.css']
})
export class LineGraphComponent implements OnInit {
    
    constructor(private _weather: WeatherService) {}

    location: string;
    chart = [];

    ngOnInit() {
        this._weather.dailyForecast().subscribe(res => {

            console.log(res);
            this.location = res["city"].name;
            let temp_max = res["list"].map(res => res.temp.max);
            let temp_min = res["list"].map(res => res.temp.min);
            let all_dates = res["list"].map(res => res.dt);

            let weatherDates = [];
            all_dates.forEach(res => {
                let jsdate = new Date(res * 1000);
                weatherDates.push(jsdate.toLocaleDateString("en", { year: "numeric", month: "short", day: "numeric" }));
            });

            this.chart = new Chart("canvas", {
                type: "line",
                data: {
                    labels: weatherDates,
                    datasets: [
                    {
                        label: "Max Temp",
                        data: temp_max,
                        borderColor: "#ed453b",
                        fill: false
                    },
                    {
                        label: "Min Temp",
                        data: temp_min,
                        borderColor: "#21adbd",
                        fill: false
                    }
                ]},
                options: {
                    scales: {
                        xAxes: [{ display: true }],
                        yAxes: [{ display: true }]
                    }
                }
            });
        });
    }
}

