import { TestBed } from '@angular/core/testing';
import { NegocioServices } from './negocio';

describe('NegocioServices', () => {
  let service: NegocioServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NegocioServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
