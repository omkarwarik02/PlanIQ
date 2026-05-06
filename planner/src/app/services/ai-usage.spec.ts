import { TestBed } from '@angular/core/testing';

import { AiUsage } from './ai-usage';

describe('AiUsage', () => {
  let service: AiUsage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AiUsage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
