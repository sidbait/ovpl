import { Component, OnInit } from "@angular/core";
import { MatchService } from "../match.service";


@Component({
  selector: "app-tables",
  templateUrl: "matches.component.html"
})
export class MatchesComponent implements OnInit {

  matchList: any;

  constructor(private matchService: MatchService) { }

  ngOnInit() { 
    this.getMatches();
  }

  getMatches(payload:any = {}) {
    this.matchService.getMatches(payload).subscribe((data: any) => {
      console.log(data);
      if (data.success) {
        this.matchList = data.data;
      }
    })
  }
}