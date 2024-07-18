import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardDetails } from '../../models/card-details.model';
import { CardDetailsService } from 'src/app/services/card-details.service';
@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css'],
})
/**
 * Manages the display and interaction of card details in the application.
 */
export class CardDetailsComponent {
navigateToDashboard() {
  this.router.navigate(['/dashboard']);
}
  cardDetailsList: CardDetails[] = [];
  selectedCardDetails: CardDetails | null = null;
  cards: CardDetails[] = [];

  constructor(private cardDetailsService: CardDetailsService,private router: Router) { }

  ngOnInit(): void {
   
    this.loadAllCardDetails();
  
  }

  loadAllCardDetails(): void {
    this.cardDetailsService.getAll().subscribe((data) => {
      console.log("#### Card Details List: " + data);
      this.cardDetailsList = data;
    });
  }

 
}
