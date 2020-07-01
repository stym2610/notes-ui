import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'change-color',
  templateUrl: './change-color.component.html',
  styleUrls: ['./change-color.component.css']
})
export class ChangeColorComponent implements OnInit {

  @Input() selectedColor;
  @Output('changedColorEvent') changedColorEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {}

  onColorChange(color: string){
    this.changedColorEvent.emit(color);
  }

}
