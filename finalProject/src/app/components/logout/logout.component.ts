import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  constructor(private router: Router){}
  ngOnInit(): void {
    window.localStorage.clear()
    window.localStorage.setItem("authenticated", "false")
    this.router.navigate(['']).then(()=>{
      window.location.reload();
    })
  }
}
