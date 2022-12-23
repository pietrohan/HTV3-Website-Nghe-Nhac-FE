import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrderViewSongComponent } from './list-order-view-song.component';

describe('ListOrderViewSongComponent', () => {
  let component: ListOrderViewSongComponent;
  let fixture: ComponentFixture<ListOrderViewSongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOrderViewSongComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOrderViewSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
