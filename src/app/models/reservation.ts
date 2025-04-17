export interface Reservation {
  clientId: number;
  collaboratorId: number;
  establishmentId: number;
  dateDebut: number; // timestamp JAVA
  dateFin: number;  // timestamp JAVA
  description: string;
  price: number;
}
