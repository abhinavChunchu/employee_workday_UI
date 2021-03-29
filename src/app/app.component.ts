import {Component, OnInit} from '@angular/core';
import {EmployeeTrackerService} from './services/employee-tracker-service';
import {EmployeeListModal} from './EmployeeListModal';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'employee-workday';
  employeeList: EmployeeListModal[] | undefined;
  displayedColumns: string[] = ['employeeId', 'vacationDays', 'employeeType', 'workingDays'];
  checkoutForm = this.formBuilder.group({
    employeeId: '',
    days: 0
  });
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource!: MatTableDataSource<EmployeeListModal>;


  constructor(
    private employeeTrackerService: EmployeeTrackerService,
    private formBuilder: FormBuilder
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      this.employeeList = await this.employeeTrackerService.getEmployees() as EmployeeListModal[];
      this.dataSource = new MatTableDataSource(this.employeeList);
    } catch (e) {
      console.log(e);
    }
  }

  async onWorkUpdate(checkoutForm: FormGroup): Promise<void> {
    this.employeeList = await this.employeeTrackerService.updateWorkDay(checkoutForm.value.employeeId,
      checkoutForm.value.days) as EmployeeListModal[];
    this.dataSource = new MatTableDataSource(this.employeeList);
  }

  async onVacationUpdate(checkoutForm: FormGroup): Promise<void> {
    this.employeeList = await this.employeeTrackerService.updateVacationDay(checkoutForm.value.employeeId,
      checkoutForm.value.days) as EmployeeListModal[];
    this.dataSource = new MatTableDataSource(this.employeeList);
  }
}
