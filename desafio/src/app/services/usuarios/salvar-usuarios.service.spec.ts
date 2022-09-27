import { TestBed } from '@angular/core/testing';

import { SalvarUsuariosService } from './salvar-usuarios.service';

describe('SalvarUsuariosService', () => {
  let service: SalvarUsuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalvarUsuariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
