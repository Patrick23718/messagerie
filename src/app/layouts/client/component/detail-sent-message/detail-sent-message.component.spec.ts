import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSentMessageComponent } from './detail-sent-message.component';

describe('DetailSentMessageComponent', () => {
  let component: DetailSentMessageComponent;
  let fixture: ComponentFixture<DetailSentMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailSentMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSentMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
