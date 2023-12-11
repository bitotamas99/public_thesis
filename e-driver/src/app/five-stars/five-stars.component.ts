import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-five-stars',
  templateUrl: './five-stars.component.html',
  styleUrls: ['./five-stars.component.scss']
})
export class FiveStarsComponent {
  @Input()
  maxRating = 5;

  @Input()
  selectedRate: number = 0;

  @Output()
  onRating: EventEmitter<number> = new EventEmitter<number>;

  previousRate=0;

  maxRatingArray: any;

  ngOnInit(): void{
    this.maxRatingArray = Array(this.maxRating).fill(0);
  }

  handleMouseEnter(index: number){
    this.selectedRate=index+1;
  }

  handleMouseLeave(){
    if(this.previousRate !== 0){
      this.selectedRate= this.previousRate;
    }
    else{
      this.selectedRate = 0;
    }
  }

  rate(index: number){
    this.selectedRate= index+1;
    this.previousRate = this.selectedRate;
    this.onRating.emit(this.selectedRate)
  }

}
