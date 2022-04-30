import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouveauSentMessageComponent } from './nouveau-sent-message.component';

describe('NouveauSentMessageComponent', () => {
  let component: NouveauSentMessageComponent;
  let fixture: ComponentFixture<NouveauSentMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NouveauSentMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NouveauSentMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
