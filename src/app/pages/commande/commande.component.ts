import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Reservation} from '../../models/reservation';
import {ReservationService} from '../../services/reservation/reservation.service';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {DayPilot, DayPilotModule} from "@daypilot/daypilot-lite-angular";
import {CollaboratorService} from '../../services/collaborator/collaborator.service';
import {Collaborator} from '../../models/collaborator';


@Component({
  selector: 'app-commande',
  imports: [FormsModule, CommonModule, DayPilotModule],
  templateUrl: './commande.component.html',
  styleUrl: './commande.component.css'
})
export class CommandeComponent {
  constructor(private route: ActivatedRoute,
              private reservationService: ReservationService,
              private collaboratorService: CollaboratorService) {
  }

  selectedPrestation = {
    description: '',
    duration: 30,
    price: 0
  };

  collaborators: Collaborator[] = [];


  establishmentId!: number;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.establishmentId = +id;
      }
    });
    this.collaboratorService.getCollaboratorsByEstablishment(this.establishmentId)
      .subscribe({
        next: (data) => {
          this.collaborators = data;
          console.log('Coiffeurs récupérés :', this.collaborators);
        },
        error: (err) => {
          console.error('Erreur lors du chargement des coiffeurs :', err);
        }
      });
  }

  selectedCollaborator: number = 1; // à adapter selon le radio sélectionné
  selectedDate: string = '';

  // CALENDAR //

  config: DayPilot.CalendarConfig = {
    viewType: 'Week',
    startDate: DayPilot.Date.today(),
    onTimeRangeSelected: (args) => this.timeRangeSelected(args)
  };



  prevWeek() {
    const dpDate = new DayPilot.Date(this.config.startDate);
    this.config = {
      ...this.config,
      startDate: dpDate.addDays(-7)
    };
  }

  nextWeek() {
    const dpDate = new DayPilot.Date(this.config.startDate);
    this.config = {
      ...this.config,
      startDate: dpDate.addDays(7)
    };
  }

  events: any[] = [
    {
      id: "1",
      text: "Barbe - Léa",
      start: DayPilot.Date.today().addHours(9),
      end: DayPilot.Date.today().addHours(9.5),
      backColor: "#202020",
      fontColor: "#f8f8f8",

    },
    {
      id: "2",
      text: "Cheveux longs - Nathan",
      start: DayPilot.Date.today().addHours(13),
      end: DayPilot.Date.today().addHours(14),
      backColor: "#202020",
      fontColor: "#f8f8f8",
    }
  ];


  timeRangeSelected($event: any) {
    const start = $event.start; // objet DayPilot.Date
    const end = $event.end;

    // Tu peux stocker directement en ISO ou formater comme tu veux
    this.selectedDate = start.toString("yyyy-MM-ddTHH:mm:ss");
    console.log("Heure sélectionnée :", this.selectedDate);
  }



  // -------- //

  prestations = [
    { name: 'Barbe', duration: 20, price: 10 },
    { name: 'Coupe enfant', duration: 30, price: 15 },
    { name: 'Cheveux court', duration: 25, price: 18 },
    { name: 'Cheveux Mi-Longs', duration: 35, price: 22 },
    { name: 'Cheveux longs', duration: 45, price: 27 }
  ];

  selectedHour: string = '';
  availableHours: string[] = [
    '09:00', '09:30', '10:00', '10:30', '11:00',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30'
  ];


  // Gérer l'état d'affichage des boutons
  selectedPrestationName: string | null = null;

  choisirPrestation(description: string, price: number, duration: number) {
    if (this.selectedPrestationName === description) {
      // Si la prestation est déjà choisie, on réinitialise
      this.selectedPrestationName = null;
    } else {
      // Sinon, on choisit une nouvelle prestation
      this.selectedPrestationName = description;
      this.selectedPrestation = { description, price, duration };
    }
  }

  onSubmit() {
    // Vérifier si tous les champs sont remplis
    if (!this.selectedPrestation.description || !this.selectedDate || !this.selectedCollaborator) {
      alert('Tous les champs doivent être remplis.');
      return;
    }

    const dateDebut = new Date(this.selectedDate);
    const dateFin = new Date(dateDebut.getTime() + this.selectedPrestation.duration * 60000);

    // Convertir en timestamp (millisecondes depuis l'époque Unix)
    const timestampDebut = dateDebut.getTime();
    const timestampFin = dateFin.getTime();

    const reservation: Reservation = {
      clientId: 1,
      collaboratorId: this.selectedCollaborator,
      establishmentId: 1,
      dateDebut: timestampDebut, // Utilisation du timestamp
      dateFin: timestampFin,     // Utilisation du timestamp
      description: this.selectedPrestation.description,
      price: this.selectedPrestation.price
    };

    this.reservationService.createReservation(reservation).subscribe({
      next: (res) => alert('Réservation confirmée !'),
      error: (err) => console.error('Erreur lors de la réservation :', err)
    });
  }

}
