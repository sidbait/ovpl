import { Component, OnInit } from "@angular/core";
import { TournamentService } from "../tournament.service";

@Component({
  selector: "app-tables",
  templateUrl: "tournaments.component.html"
})
export class TournamentsComponent implements OnInit {

  tournamentList: any;

  constructor(private tournamentService: TournamentService) { }

  ngOnInit() { 
    this.getTournaments();
  }

  getTournaments(payload:any = {}) {
    this.tournamentService.getTournaments(payload).subscribe((data: any) => {
      console.log(data);
      if (data.success) {
        this.tournamentList = data.data;
      }
    })
  }
}
