import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNewPlaylistComponent } from './list-new-playlist.component';

describe('ListNewPlaylistComponent', () => {
  let component: ListNewPlaylistComponent;
  let fixture: ComponentFixture<ListNewPlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListNewPlaylistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListNewPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
