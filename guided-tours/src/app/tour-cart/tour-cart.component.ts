import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tour } from '../models/tour';
import { TourRequest } from '../models/tour-request';
import { RouteService } from '../services/route.service';
import { TourRequestService } from '../services/tour-request.service';
import { TourService } from '../services/tour.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-tour-cart',
  templateUrl: './tour-cart.component.html',
  styleUrls: ['./tour-cart.component.css']
})
export class TourCartComponent implements OnInit {

  tour?: Tour;
  stars: Array<number> = [];
  tourRequest: TourRequest = {};

  submitStatus: boolean=false;

// Date work
minDate:any= "2023-03-17";

getDate(){
  let dateVal=new Date();
  let todaysDate:any=dateVal.getDate();
  if(todaysDate<10){
    todaysDate ="0"+todaysDate;
  }
  let month:any=dateVal.getMonth()+1;
  if(month<10){
    month ="0"+month;
  }
  let year=dateVal.getFullYear()
  this.minDate=year+"-"+month+"-"+todaysDate
  alert(this.minDate)
}



// 



  canDeactivate() {
    if (!this.submitStatus)
        this.submitStatus = confirm("You have not made a request to this tour, Are you sure you want to leave?");
    return this.submitStatus;
}
// minDate: string;



  constructor(private activatedRoute: ActivatedRoute,
    private tourService: TourService,
    private tourRequestService: TourRequestService,
    private routeService: RouteService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
    ) { }




  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(param => {
      let id = param.get("id") ?? "";
      this.tourService.getTour(id).subscribe(data => {
        this.tour = data;
        this.stars = new Array(this.tour.rating);
        this.submitStatus = false;
   
      })
    })
  }

  makeRequest() {
    if (this.tourRequest.customerName && this.tourRequest.customerEmail && this.tourRequest.customerPhone && this.tourRequest.dateOfTravel) {
      this.tourRequestService.saveTourRequest(this.tourRequest).subscribe(data => {
        this.snackBar.open("Request Submitted", "", {
          duration: 3000
        });
        this.submitStatus = true;
        this.routeService.navigateToHomeView();
      })
    }
  }

}
