import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditSongComponent } from './user-edit-song.component';

describe('UserEditSongComponent', () => {
  let component: UserEditSongComponent;
  let fixture: ComponentFixture<UserEditSongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserEditSongComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserEditSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
