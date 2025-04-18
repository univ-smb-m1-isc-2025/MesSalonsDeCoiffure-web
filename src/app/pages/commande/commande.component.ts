import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Reservation} from '../../models/reservation';
import {ReservationService} from '../../services/reservation/reservation.service';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {DayPilot, DayPilotModule} from "@daypilot/daypilot-lite-angular";
import {CollaboratorService} from '../../services/collaborator/collaborator.service';
import {Collaborator} from '../../models/collaborator';
import {NewReservation} from '../../models/new-reservation';
import {MatSnackBar} from '@angular/material/snack-bar';
import {User} from '../../models/user.model';
import {UsersService} from '../../services/login/users.service';


@Component({
  selector: 'app-commande',
  imports: [FormsModule, CommonModule, DayPilotModule],
  templateUrl: './commande.component.html',
  styleUrl: './commande.component.css'
})
export class CommandeComponent {
  constructor(private route: ActivatedRoute,
              private reservationService: ReservationService,
              private collaboratorService: CollaboratorService,
              private router: Router,
              private usersService: UsersService,
              ) {
  }

  selectedPrestation = {
    description: '',
    duration: 30,
    price: 0
  };
  user: User | null = null;
  collaborators: Collaborator[] = [];
  availableHours: string[] = [];
  events: any[] = [];
  selectedCollaborator: Collaborator | null = null;
  private _snackBar = inject(MatSnackBar);
  establishmentId!: number;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.establishmentId = +id;
      }
    });
    this.user = this.usersService.getCurrentUser();
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
    this.onCollaboratorChange()
  }

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

  // -------- //

  prestations = [
    { name: 'Barbe', duration: 20, price: 10 },
    { name: 'Coupe enfant', duration: 30, price: 15 },
    { name: 'Cheveux court', duration: 25, price: 18 },
    { name: 'Cheveux Mi-Longs', duration: 35, price: 22 },
    { name: 'Cheveux longs', duration: 45, price: 27 }
  ];

  selectedHour: string = '';

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

  timeRangeSelected($event: any) {
    const start = $event.start;
    this.selectedDate = start.toString("yyyy-MM-ddTHH:mm:ss");
    console.log("Heure sélectionnée :", this.selectedDate);
    this.updateAvailableHours();
  }


  updateAvailableHours() {
    console.log("update", this.availableHours);
    if (!this.selectedCollaborator || !this.selectedDate) return;

    const selectedDateOnly = new Date(this.selectedDate).toISOString().split('T')[0]; // format YYYY-MM-DD

    this.reservationService.getReservationsByCollaborator(this.selectedCollaborator.user.id).subscribe({
      next: (reservations) => {
        const takenSlots: string[] = reservations
          .filter(res => {
            const resDate = new Date(res.dateDebut).toISOString().split('T')[0];
            return resDate === selectedDateOnly;
          })
          .map(res => {
            const start = new Date(res.dateDebut);
            return start.getHours().toString().padStart(2, '0') + ':' + (start.getMinutes() === 0 ? '00' : '30');
          });

        // Créneaux possibles (à adapter selon ton salon)
        const possibleHours = [
          '09:00', '09:30', '10:00', '10:30', '11:00',
          '13:00', '13:30', '14:00', '14:30', '15:00', '15:30'
        ];

        this.availableHours = possibleHours.filter(hour => !takenSlots.includes(hour));
      },
      error: (err) => console.error('Erreur lors du chargement des réservations :', err)
    });
  }

  onCollaboratorChange() {
    if(this.selectedCollaborator != null){
      console.log('Collaborateur sélectionné :', this.selectedCollaborator);
      this.loadEventsForCollaborator(this.selectedCollaborator.user.id);
      this.updateAvailableHours();
    }
  }


  loadEventsForCollaborator(collaboratorId: number) {
    this.reservationService.getReservationsByCollaborator(collaboratorId).subscribe({
      next: (reservations) => {
        console.log("collaboratorId", collaboratorId,reservations);
        this.events = reservations.map(res => ({
          id: res.id,
          text: `${res.description} - Client ${res.client.firstName}`, // à adapter si tu as le nom
          start: new DayPilot.Date(new Date(res.dateDebut)),
          end: new DayPilot.Date(new Date(res.dateFin)),
          backColor: "#202020",
          fontColor: "#f8f8f8"
        }));
      },
      error: (err) => console.error("Erreur lors du chargement des événements :", err)
    });
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

    const reservation: NewReservation = {
      clientId: this.user?.id || 1,
      collaboratorId: this.selectedCollaborator.id,
      establishmentId: this.establishmentId,
      dateDebut: timestampDebut, // Utilisation du timestamp
      dateFin: timestampFin,     // Utilisation du timestamp
      description: this.selectedPrestation.description,
      price: this.selectedPrestation.price
    };

    this.reservationService.createReservation(reservation).subscribe({
      next: (res) => {
        this.openSnackBar('Réservation confirmée !', 'Fermer');

        this.router.navigate(['/profil']);
      },
      error: (err) => console.error('Erreur lors de la réservation :', err)
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
