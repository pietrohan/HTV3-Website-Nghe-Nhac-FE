import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrderViewPlaylistComponent } from './list-order-view-playlist.component';

describe('ListOrderViewPlaylistComponent', () => {
  let component: ListOrderViewPlaylistComponent;
  let fixture: ComponentFixture<ListOrderViewPlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOrderViewPlaylistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOrderViewPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
