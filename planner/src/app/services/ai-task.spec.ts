import { TestBed } from '@angular/core/testing';

import { AiTask } from './ai-task';

describe('AiTask', () => {
  let service: AiTask;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AiTask);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
