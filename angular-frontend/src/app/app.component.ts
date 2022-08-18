import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Payload } from './payload';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('fileForm') fileForm!: ElementRef;
  images$?: Observable<Payload[]>;
  urlBase = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.images$ = this.http.get<Payload[]>(this.urlBase);
  }

  submitForm() {
    const formData = new FormData(this.fileForm.nativeElement);

    this.http.post<Payload>('http://localhost:5000/', formData).subscribe({
      next: (data: Payload) => {
        console.log('response: ', data);
        this.images$ = this.http.get<Payload[]>(this.urlBase);
      },
      error: (err) => console.log(err),
      complete: () => console.log('complete'),
    });
  }
}
