import {User} from './user.model';
import {Collaborator} from './collaborator';
import {Establishment} from './establishment.model';

export interface Reservation {
  id: number;
  dateDebut: number;
  dateFin: number;
  description: string;
  price: number;
  client: User;
  collaborator: Collaborator;
  establishment: Establishment;
}
