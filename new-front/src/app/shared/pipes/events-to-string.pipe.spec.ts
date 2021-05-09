import { EventsToStringPipe } from 'src/app/shared/pipes/events-to-string.pipe';

describe('EventsToStringPipe', () => {
  it('create an instance', () => {
    const pipe = new EventsToStringPipe();
    expect(pipe).toBeTruthy();
  });
});
