import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { FeedBackService } from './feedback.service';
declare var $;

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  providers:[FeedBackService]
})
export class FeedbackComponent implements OnInit {
  feedbackeForm: FormGroup;
  constructor(private fb: FormBuilder,private feedbackService: FeedBackService) {
    this.FeebackForm();
  }

  ngOnInit() {
  }
  FeebackForm() {
    this.feedbackeForm = this.fb.group({
      subject: [null, Validators.required],
      feedback: [null, Validators.required],
      evaluationType:["FEEDBACK",Validators.nullValidator]
    });
  }
  submitFeedback(data)
  {
    this.feedbackService.addNewFeedback(data).subscribe(
      result => {
        if (result.body.httpCode == 200) {
          $.toaster({ priority: 'success', title: 'Success', message: 'Feedback added successfully' });
        }
        else {
          $.toaster({ priority: 'error', title: 'Error', message: result.body.failureReason });
        }
      },
      err => {
        console.log(err);
      });
  }
}
