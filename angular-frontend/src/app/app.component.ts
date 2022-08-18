import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('fileForm') fileForm!: ElementRef;
  images$?: Observable<{ name: string, url: string }[]>;
  urlBase = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.images$ = this.http.get<{ name: string, url: string }[]>(this.urlBase);
  }

  submitForm() {
    const formData = new FormData(this.fileForm.nativeElement);

    this.http.post('http://localhost:5000/', formData).subscribe({
      next: (data) => {
        console.log(data);
        this.images$ = this.http.get<{ name: string, url: string }[]>(this.urlBase);
      },
      error: (err) => console.log(err),
      complete: () => console.log('complete'),
    });
  }
}
