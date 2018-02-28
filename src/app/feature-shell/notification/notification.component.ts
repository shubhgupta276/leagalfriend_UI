import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl,ReactiveFormsModule } from '@angular/forms';
declare var $;
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
})
export class NotificationComponent implements OnInit {
    notificationForm: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.addreferrelform();
  }
  addreferrelform() {
    this.notificationForm = this.fb.group({
        Email: [null, Validators.required]
    });
  }
  ngOnInit() {
  }
  adddynamic() {
   var empty = 0;
    $('input[type=text]').each(function(){
       if (this.value == "") {
           empty++;
       } 
    })
    if(empty<=1){
        const $template = $('#optionTemplate'),
            $clone = $template
                .clone()
                .removeClass('hide')
                .removeAttr('id')
                .insertBefore($template),
            $option = $clone.find('[name="option[]"]');

        // Add new field
        $('#referrelForm').formValidation('addField', $option);
    }
}
   
    sendreferrelmail(data: any) {
        debugger
        var  values = '';
        var $elements = [];
        $('input[type=text]').each(function(){
                
                //values += this.value;
                $elements.push(this.value);
            });
    
            alert($elements);
            //$('body').append(divValue);
      }
  
}