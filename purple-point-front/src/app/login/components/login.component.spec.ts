import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('component initial state', () => {
    expect(component.isSubmitted).toBeFalsy();
  });

  it('submitted should be true when onSubmit()', () => {
    expect(component.isSubmitted).toBeTruthy();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
