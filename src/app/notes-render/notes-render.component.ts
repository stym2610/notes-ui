import { JwtHelper } from 'angular2-jwt';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'notes-render',
  templateUrl: './notes-render.component.html',
  styleUrls: ['./notes-render.component.css']
})
export class NotesRenderComponent implements OnInit {

  constructor(private auth: AuthenticationService, private route: Router) { }

  ngOnInit(): void { }

  

}
