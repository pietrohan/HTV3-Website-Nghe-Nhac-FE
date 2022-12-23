import { TestBed } from '@angular/core/testing';

import { CommentplaylistService } from './commentplaylist.service';

describe('CommentplaylistService', () => {
  let service: CommentplaylistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentplaylistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
