import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Chart } from "chart.js";

@Component({
  selector: 'app-polar-area',
  templateUrl: './polar-area.component.html',
  styleUrls: ['./polar-area.component.css']
})
export class PolarAreaComponent implements OnInit {
    
    constructor(private _weather: WeatherService) {}

    location: string;
    chart = [];

    ngOnInit() {
        this._weather.dailyForecast().subscribe(res => {

            console.log(res);
            this.location = res["city"].name;
            let temp_diff = res["list"].map(res => 10 * (res.temp.max - res.temp.min));
            let all_dates = res["list"].map(res => res.dt);

            let weatherDates = [];
            all_dates.forEach(res => {
                let jsdate = new Date(res * 1000);
                weatherDates.push(jsdate.toLocaleDateString("en", { year: "numeric", month: "short", day: "numeric" }));
            });

            this.chart = new Chart("canvas", {
                type: "polarArea",
                data: {
				datasets: [{
					data: temp_diff,
					backgroundColor: [
                        "#ed453b66",
                        "#21adbd66",
                        "#fe970e66",
                        "#4fa85166",
                        "#9229ac66",
                        "#fe638366",
                        "#11b6cb66"
					],
					label: 'Max temp'
				}],
				labels: weatherDates
				},
                options: {
                    responsive: true,
                    legend: {
                        position: 'right',
                    },
                    title: {
                        display: true,
                        text: 'Weather Map'
                    },
                    scale: {
                        ticks: {
                            beginAtZero: true
                        },
                        reverse: false
                    },
                    animation: {
                        animateRotate: false,
                        animateScale: true
                    }
                }
            });
        });
    }
}

