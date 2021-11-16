import { Component, OnInit } from "@angular/core";
import { TeamService } from "../team.service";

@Component({
  selector: "app-tables",
  templateUrl: "teams.component.html"
})
export class TeamsComponent implements OnInit {

  teamList: any;

  constructor(private teamService: TeamService) { }

  ngOnInit() { 
    this.getTeams();
  }

  getTeams(payload:any = {}) {
    this.teamService.getTeams(payload).subscribe((data: any) => {
      console.log(data);
      if (data.success) {
        this.teamList = data.data;
      }
    })
  }
}
