import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()

export class EmployeeTrackerService {
  baserUrl = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {
  }

  getEmployees = () => {
    return this.httpClient.get(this.baserUrl + '/employees').toPromise();
  }

  updateWorkDay(employeeId: string, day: number): Promise<any> {
    const headers = new HttpHeaders().set('Cache-Control', 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0');
    headers.append('Pragma', 'no-cache'); // add a new header, creating a new object
    headers.append('Expires', '0'); // add another header

    return this.httpClient.post(this.baserUrl + '/employee-work', {employeeId, day}, {headers}).toPromise();
  }

  updateVacationDay(employeeId: string, day: number): Promise<any> {
    const headers = new HttpHeaders().set('Cache-Control', 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0');
    headers.append('Pragma', 'no-cache'); // add a new header, creating a new object
    headers.append('Expires', '0'); // add another header

    return this.httpClient.post(this.baserUrl + '/employee-vacation', {employeeId, day}, {headers}).toPromise();
  }
}
