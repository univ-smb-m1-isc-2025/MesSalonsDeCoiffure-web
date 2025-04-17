import {User} from './user.model';
import {Establishment} from './establishment.model';

export interface Collaborator {
  id: number;
  user: User;
  establishment: Establishment;
}
