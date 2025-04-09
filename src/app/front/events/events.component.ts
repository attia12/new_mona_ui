import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {EventService} from "../../services/event.service";
import {AnimationOptions} from "ngx-lottie";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['../../../assets/css/style.css','../../../assets/vendor/font-awesome/css/all.min.css','../../../assets/vendor/bootstrap-icons/bootstrap-icons.css','../../../assets/vendor/dropzone/dist/dropzone.css',
    '../../../assets/vendor/flatpickr/dist/flatpickr.css','../../../assets/vendor/choices.js/public/assets/styles/choices.min.css'],
  encapsulation:ViewEncapsulation.None
})
export class EventsComponent implements OnInit{
  events :any[]= [];
  filteredEvents: any[] = [];
  lottieOptions: AnimationOptions = {
    path: '/assets/no_event.json',
    loop: true,
    autoplay: true,
  };

  constructor(private eventService: EventService) {
  }

  ngOnInit(): void {
    this.eventService.events$.subscribe(updatedEvents => {
      this.events = updatedEvents;
      this.filteredEvents = [...this.events];
    });
    this.eventService.getActiveEvents().subscribe();
  }

  // private loadEvents(): void {
  //   this.eventService.getActiveEvents().subscribe({
  //     next: (events: any) => {
  //       console.log(events);
  //       this.events = events;
  //     },
  //     error: (err) => {
  //       console.error('Error fetching events:', err);
  //     }
  //   });
  // }

  onSearch(filters: { genre: string; startDate: string; endDate: string }) {
    console.log('Filters received:', filters);

    const { genre, startDate, endDate } = filters;

    this.filteredEvents = this.events.filter(event => {
      // Debug logs
      console.log("Event category:", event.category);
      console.log("Event startDate:", event.startDate);
      console.log("Event endDate:", event.date);

      // Match genre
      const matchGenre = genre ? event.category?.toLowerCase() === genre.toLowerCase() : true;

      // Convert dates
      const eventStartDate = new Date(event.startDate);
      const eventEndDate = new Date(event.date);
      const filterStartDate = startDate ? new Date(startDate) : null;
      const filterEndDate = endDate ? new Date(endDate) : null;

      // Match dates
      const matchStart = filterStartDate ? eventStartDate >= filterStartDate : true;
      const matchEnd = filterEndDate ? eventEndDate <= filterEndDate : true;

      return matchGenre && matchStart && matchEnd;
    });

    console.log('Filtered events:', this.filteredEvents);
  }

  resetFilters() {
    this.filteredEvents = [...this.events];
  }
}
