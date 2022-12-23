import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarLoginResisterComponent } from './navbar-login-resister.component';

describe('NavbarLoginResisterComponent', () => {
  let component: NavbarLoginResisterComponent;
  let fixture: ComponentFixture<NavbarLoginResisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarLoginResisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarLoginResisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
