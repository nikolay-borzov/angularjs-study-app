import { Author } from './author';

export class Course {
  id: number;
  name: string;
  description: string;
  durationMinutes: number;
  date: Date;
  authorIds: Array<number>;
}
