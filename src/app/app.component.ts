import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  sensor1: Object;
  sensor2: Object;
  sensor3: Object;

  // Inject HttpClient into your component or service.
  constructor(private http: HttpClient) {
    this.counter = 0;
    this.lables = [0];
    this.nums1 = [];
    this.nums2 = [];
    this.nums3 = [];
    this.val = 0;
    this.data1 = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'First Dataset',
          data: [1000],
          fill: false,
          borderColor: '#4bc0c0'
        }
        // ,
        // {
        //   label: 'Second Dataset',
        //   data: [28, 48, 40, 19, 86, 27, 90],
        //   fill: false,
        //   borderColor: '#565656'
        // }
      ]
    }


    this.data = {
      labels: ['A', 'B'],
      datasets: [
        {
          data: [0, 5],
          backgroundColor: [
            '#00f100',
            '#e2e2e2'
          ],
          hoverBackgroundColor: [
            '#00f100',
            '#e2e2e2'
          ]
        }]
    };
    this.options = {
      responsive: true,
      animation: false
    };
  }

  enableMotor = true;
  enableMotorDir = false;
  counter: number
  lables: any;
  nums1: any;
  nums2: any;
  nums3: any;
  data1: any;
  val: number;
  options: any;
  data: any;
  styleObj: any;
  calibrationNeeded = true;

  isFalseTick = false;

  speedGaugeType = 'full';
  speedGaugeValue = this.val;
  speedGaugeLabel = 'Speed';
  speedGaugeAppendText = 'RPM'

  torqueGaugeType = 'full';
  torqueGaugeValue = this.val;
  torqueGaugeLabel = 'Torque';
  torqueGaugeAppendText = 'Nm'

  gaugeType = "full";
  gaugeValue = this.val;
  gaugeLabel = "Engine Throttle";
  gaugeAppendText = "%";

  updateThrottle(e): void {
    this.gaugeValue = e.value * 20;
    this.torqueGaugeValue = e.value * 20;
    this.speedGaugeValue = e.value * 20;
  }

  // resetThrottle(): void {
  //   this.data = {
  //     labels: ['A', 'B'],
  //     datasets: [
  //       {
  //         data: [0, 5],
  //         backgroundColor: [
  //           '#00f100',
  //           '#e2e2e2'
  //         ],
  //         hoverBackgroundColor: [
  //           '#00f100',
  //           '#e2e2e2'
  //         ]
  //       }]
  //   };
  // }

  setSpeed() {
    this.http.get('http://localhost:2744/api/celeb/GetUpdateSpeed?speed=' + this.val).subscribe(data => {
      console.log("Returned ", data);
    });
  }

  callCalibrate() {
    this.http.get('http://localhost:2744/api/celeb/GetCalibration').subscribe(data => {
      this.calibrationNeeded = false;
    });
  }

  engineOptions(option) {
    this.http.get('http://localhost:2744/api/celeb/GetEngineOptions?option=' + option).subscribe(data => {
    });
  }

  toggleEngine() {
    this.enableMotor ? this.engineOptions('500') : this.engineOptions('501');
  }

  toggleDirection() {
    this.enableMotorDir ? this.engineOptions('600') : this.engineOptions('601');
  }


  ngOnInit(): void {

    setInterval(() => {
      this.http.get('http://localhost:2744/api/celeb/GetLargeRPM').subscribe(data => {
        const timeForRound: any = data;
        this.sensor1 = 60 / timeForRound;
            this.nums1.push(data);
            if (this.nums1.length > 10) {
              this.nums1.shift();
            }
      });
      this.http.get('http://localhost:2744/api/celeb/GetMediumRPM').subscribe(data => {
        const timeForRound: any = data;
        this.sensor2 = 60 / timeForRound;
            this.nums2.push(data);
            if (this.nums2.length > 10) {
              this.nums2.shift();
            }
      });
      this.http.get('http://localhost:2744/api/celeb/GetSmallRPM').subscribe(data => {
        if (data === null && !this.isFalseTick) {
          this.isFalseTick = true;
        }

        if (data !== null && !this.isFalseTick) {
          const timeForRound: any = data;
          this.sensor3 = 60 / timeForRound;
              this.nums3.push(data);
              if (this.nums3.length > 10) {
                this.nums3.shift();
              }
        }
        this.isFalseTick = false;
      })


        this.lables.push(this.counter++);
        if (this.lables.length > 10) {
          this.lables.shift();
        }
        this.data1 = {
          labels: this.lables,
          datasets: [
            {
              label: 'Snesor1',
              data: this.nums1,
              fill: false,
              borderColor: '#a048fd'
            },
            {
              label: 'Sensor2',
              data: this.nums2,
              fill: false,
              borderColor: '#14a3fe'
            },
            {
              label: 'Sensor3',
              data: this.nums3,
              fill: false,
              borderColor: '#ff00d2ba'
            }
          ]
        };
    }, 1000);
  }
}
