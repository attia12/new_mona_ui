import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {ParicipationService} from "../../services/paricipation.service";
import {FeedbackService} from "../../services/feedback.service";

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['../../../assets/css/style.css','../../../assets/vendor/font-awesome/css/all.min.css','../../../assets/vendor/bootstrap-icons/bootstrap-icons.css','../../../assets/vendor/dropzone/dist/dropzone.css',
    '../../../assets/vendor/flatpickr/dist/flatpickr.css','../../../assets/vendor/choices.js/public/assets/styles/choices.min.css'],
  encapsulation:ViewEncapsulation.None
})
export class EventDetailComponent implements OnInit{
  event: any;
  userId=1;
  isParticipating: boolean = false;
  feedbacks:any[]=[];
  feedback:any={};

  constructor(private feedbackService:FeedbackService,private route: ActivatedRoute,private toastr:ToastrService,private participationService: ParicipationService) {

    const navigation = window.history.state;
    this.event = navigation.eventData ? navigation.eventData : null;
  }

  ngOnInit(): void {
        console.log(this.event);
    this.participationService.participation$.subscribe(status => {
      this.isParticipating = status;
    });
        this.checkUserParticipation(this.event.id)
    this.loadFeedbackForAnEvent();
    }

  participateInEvent() {

    if (!this.event || !this.event.id) {
      this.toastr.error("Event details are missing.", "Error");
      return;
    }

    const participationRequest = {
      eventId: this.event.id,
      userId: this.userId
    };

    this.participationService.registerParticipation(participationRequest).subscribe({
      next: () => {
        this.toastr.success("You have successfully registered for this event!", "Success");
      },
      error: (error) => {
        this.toastr.error(error.error.error, "Error");
        console.error("Error registering participation:", error);
      }
    });
  }
  checkUserParticipation(eventId: number) {
    this.participationService.isUserParticipating(eventId, this.userId).subscribe({
      next: (isParticipating) => {
        this.isParticipating = isParticipating;
      },
      error: (error) => {
        console.error("Error checking participation status:", error);
      }
    });
  }
  loadFeedbackForAnEvent()
  {
    this.feedbackService.getFeedbackForEvent(this.event.id).subscribe({
      next: (feedbacks) => {
        this.feedbacks = feedbacks;
        console.log("Feedback loaded:", this.feedbacks);
      },
      error: (error) => {
        this.toastr.error("Failed to load feedback.", "Error");
        console.error("Error loading feedback:", error);
      }
    });

  }

  submitFeedback() {
    if ( !this.feedback.comment) {
      this.toastr.warning("Please provide both rating and comment.", "Validation Error");
      return;
    }

    const feedbackRequest = {
      eventId: this.event.id,
      userId: this.userId,

      comment: this.feedback.comment
    };

    this.feedbackService.submitFeedback(feedbackRequest).subscribe({
      next: (response) => {
        this.toastr.success("Feedback submitted successfully!", "Success");
        this.feedbacks.unshift(response);
        this.feedback = {  };
        (document.getElementById('feedbackModal') as any).modal('hide');
      },
      error: (error) => {
        this.toastr.error("Failed to submit feedback.", "Error");
      }
    });
  }
}
