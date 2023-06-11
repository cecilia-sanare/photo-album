import { Chance } from 'chance';
import { Photo } from '../app/store/slices/photos.slice';

const chance = new Chance();

export function mockPhoto(photo?: Partial<Photo>): Photo {
  return {
    id: chance.integer(),
    albumId: chance.integer(),
    title: chance.string(),
    thumbnailUrl: chance.url(),
    url: chance.url(),
    ...photo
  }
}

export function mockPhotos(count, photo: Partial<Photo>): Photo[] {
  return chance.n(() => mockPhoto(photo), count);
}
