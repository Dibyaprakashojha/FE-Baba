import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SubmitService {
  constructor(private http: HttpClient) {}

  private URL = `${environment.BASE_URL}/userDetails/addUserDetails`;
  private IMAGE_URL = `${environment.BASE_URL}/image/fileSystem`;

  submitDetails(value: any): Observable<any> {
    console.log(`service`, value);
    return this.http.post(this.URL, value);
  }

  uploadFile(file: any): any {
    const formData: FormData = new FormData();
    formData.append('image', file);
    console.log(`formdata`, file);
    return this.http.post(this.IMAGE_URL, formData, { responseType: 'text' });
  }
}
