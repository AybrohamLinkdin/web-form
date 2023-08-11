import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Satellite {
  catalogNumber: string;
  name: string;
  tle: Tle;
  type: string;
}

export interface Tle {
  name: string;
  tle1: string;
  tle2: string;
}

@Component({
  selector: 'app-scenario-builder',
  templateUrl: './scenario-builder.component.html',
  styleUrls: ['./scenario-builder.component.css'],
})
export class ScenarioBuilderComponent implements OnInit {
  /* List of assets that have been loaded but have not been moved to a team */
  unselected: Tle[] = new Array();

  /* List of assets that have been moved to the blue team */
  hvas: Tle[];

  /* List of assets that have been moved to the red team */
  offensiveSats: Tle[];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get('/assets/tles.txt', { responseType: 'text' })
      .subscribe((tles: any) => {
        let name = undefined;
        let lineOne = undefined;
        let lineTwo = undefined;
        tles.split(/\r?\n/).forEach((line) => {
          if (line.length != 69) {
            name = line;
          } else if (Array.from(line)[0] === '1') {
            lineOne = line;
          } else if (Array.from(line)[0] === '2') {
            lineTwo = line;
            this.unselected.push({ name: name, tle1: lineOne, tle2: lineTwo });
          }
        });
      });
  }
}
