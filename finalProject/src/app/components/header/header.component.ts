import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  searchForm;

  constructor(private formBuilder: FormBuilder){
    this.searchForm=this.formBuilder.group({
      search:'',
    })
  }
  
}
 


