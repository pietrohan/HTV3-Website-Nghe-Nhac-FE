import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSongComponent } from './user-song.component';

describe('UserSongComponent', () => {
  let component: UserSongComponent;
  let fixture: ComponentFixture<UserSongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSongComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
