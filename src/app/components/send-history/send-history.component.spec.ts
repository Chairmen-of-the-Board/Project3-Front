import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendHistoryComponent } from './send-history.component';

describe('SendHistoryComponent', () => {
  let component: SendHistoryComponent;
  let fixture: ComponentFixture<SendHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
