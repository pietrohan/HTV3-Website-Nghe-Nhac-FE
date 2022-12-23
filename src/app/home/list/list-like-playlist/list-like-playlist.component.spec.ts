import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLikePlaylistComponent } from './list-like-playlist.component';

describe('ListLikePlaylistComponent', () => {
  let component: ListLikePlaylistComponent;
  let fixture: ComponentFixture<ListLikePlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListLikePlaylistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListLikePlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
