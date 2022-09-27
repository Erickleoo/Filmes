import { TestBed } from '@angular/core/testing';

import { SalvarFilmesService } from './salvar-filmes.service';

describe('SalvarFilmesService', () => {
  let service: SalvarFilmesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalvarFilmesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
