import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { SubmitService } from 'src/shared/services/submit.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  detailsForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private submit: SubmitService,
    private sanitizer: DomSanitizer
  ) {
    this.createForm();
  }
  ngOnInit(): void {}

  createForm() {
    this.detailsForm = this.fb.group({
      fullName: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: ['', Validators.required],
      skills: [''],
      hobbies: [''],
      fileId: [''],
    });
  }

  selectedFile: any = null;
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
    let url = this.sanitizer.bypassSecurityTrustUrl(
      window.URL.createObjectURL(this.selectedFile)
    );
    console.log(this.selectedFile);
  }

  employee: any = [];
  postResponse: any;
  successResponse!: string;

  onSubmit() {
    // this.submit.uploadFile(this.selectedFile).subscribe((response: any) => {
    //   if (response.status === 200) {
    //     this.postResponse = response;
    //     this.successResponse = this.postResponse.body.message;
    //     console.log(`Post response`, this.postResponse);
    //     console.log(`Success Response`, this.successResponse);
    //   } else {
    //     this.successResponse = 'Image not uploaded due to some error!';
    //   }
    //   console.log(`Response from upload`, response);
    // });

    // this.submit
    //   .submitDetails(this.detailsForm.value)
    //   .subscribe((response: any) => {
    //     console.log(`Response:`, response);
    //     this.employee.push(response);
    //   });
    this.submit.uploadFile(this.selectedFile).subscribe({
      next: (res: any) => {
        console.log(`Response`, res);
        this.detailsForm.value.fileId = res;
        console.log(`FileId`, this.detailsForm.value.fileId);
      },
      err: (err: any) => console.log(`Error`, err),
      complete: () => {
        this.submit.submitDetails(this.detailsForm.value).subscribe({
          next: (res: any) => console.log(`res`, res),
          error: (err: any) => console.log(`err`, err),
          complete: () => {
            console.log(`in complete`);
          },
        });
      },
    });
  }
}
