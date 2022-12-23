import { TestBed } from '@angular/core/testing';

import { CommentsongService } from './commentsong.service';

describe('CommentService', () => {
  let service: CommentsongService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentsongService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
