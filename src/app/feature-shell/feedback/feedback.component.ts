import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
declare var $;

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
})
export class FeedbackComponent implements OnInit {
  feedbackeForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.FeebackForm();
  }

  ngOnInit() {
  }
  FeebackForm() {
    this.feedbackeForm = this.fb.group({
      subject: [null, Validators.required],
      feedback: [null, Validators.required]
    });
  }
}
