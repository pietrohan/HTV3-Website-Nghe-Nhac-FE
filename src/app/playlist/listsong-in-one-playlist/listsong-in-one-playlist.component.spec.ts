import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsongInOnePlaylistComponent } from './listsong-in-one-playlist.component';

describe('ListsongInOnePlaylistComponent', () => {
  let component: ListsongInOnePlaylistComponent;
  let fixture: ComponentFixture<ListsongInOnePlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListsongInOnePlaylistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListsongInOnePlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
