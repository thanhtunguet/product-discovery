import {debounce} from 'helpers/debounce';

describe('debounce helper', () => {
  it('debounce works!', () => {
    let a: number = 1;

    const update = debounce(() => {
      a += 1;
    });

    for (let i: number = 0; i < 10; i++) {
      update();
    }

    setTimeout(() => {
      expect(a).toEqual(2);
    }, 400);
  });
});
