import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaComponent implements OnInit {


  constructor(private http: HttpClient) { }

  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81], label: 'Ventas' }
  ];

  public lineChartLabels: Label[] = [
    'Enero', 'Febrero', 'Marzo', 'Abril'
  ];

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.http.get('http://localhost:5000/grafica').subscribe(
      (data: any) => this.lineChartData = data
    );
  }
}
