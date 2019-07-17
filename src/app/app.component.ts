import { Component } from '@angular/core';
import { process, State } from '@progress/kendo-data-query';
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'clientside-kendogrid-angular7';
  apiData = [];
  data = [];
  anyApiData: any;
  public columns: any[] = [{ field: "id" }, { field: "employee_name" }, { field: "employee_salary" }, { field: "employee_age" }];
  public gridData: any = this.data;
  constructor(private _http: HttpClient) {
  }

  ngOnInit(): void {
    this._http.get('http://dummy.restapiexample.com/api/v1/employees')
      .subscribe(res => {
        this.anyApiData = res;
        for (var i = 0; i < this.anyApiData.length; i++) {
          this.data.push(this.anyApiData[i]);
        }
      });
    
  }

  public state: State = {
    skip: 0,
    take: 10,
    filter: {
      logic: 'and',
      filters: []
    }
  };

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.gridData = process(this.data, this.state);
  }

}
