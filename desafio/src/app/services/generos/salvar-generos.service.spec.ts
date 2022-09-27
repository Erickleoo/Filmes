import { TestBed } from '@angular/core/testing';

import { SalvarGenerosService } from './salvar-generos.service';

describe('GenerosService', () => {
  let service: SalvarGenerosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalvarGenerosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
