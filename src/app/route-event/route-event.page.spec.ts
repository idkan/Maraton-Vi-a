import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteEventPage } from './route-event.page';

describe('RouteEventPage', () => {
  let component: RouteEventPage;
  let fixture: ComponentFixture<RouteEventPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteEventPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
