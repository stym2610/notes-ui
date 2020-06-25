import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesRenderComponent } from './notes-render.component';

describe('NotesRenderComponent', () => {
  let component: NotesRenderComponent;
  let fixture: ComponentFixture<NotesRenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesRenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
