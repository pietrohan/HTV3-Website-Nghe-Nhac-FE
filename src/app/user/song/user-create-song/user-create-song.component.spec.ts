import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCreateSongComponent } from './user-create-song.component';

describe('UserCreateSongComponent', () => {
  let component: UserCreateSongComponent;
  let fixture: ComponentFixture<UserCreateSongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCreateSongComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCreateSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
