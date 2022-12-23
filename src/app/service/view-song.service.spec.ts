import { TestBed } from '@angular/core/testing';

import { ViewSongService } from './view-song.service';

describe('ViewSongService', () => {
  let service: ViewSongService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewSongService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
