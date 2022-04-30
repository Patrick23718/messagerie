import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSentMessageComponent } from './list-sent-message.component';

describe('ListSentMessageComponent', () => {
  let component: ListSentMessageComponent;
  let fixture: ComponentFixture<ListSentMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSentMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSentMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
