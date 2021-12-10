import { Component, OnInit } from "@angular/core";
import { PlayerService } from "../player.service";


@Component({
  selector: "app-tables",
  templateUrl: "players.component.html"
})
export class PlayersComponent implements OnInit {

  playerList: any;

  constructor(private playerService: PlayerService) { }

  ngOnInit() { 
    this.getPlayers();
  }

  getPlayers(payload:any = {}) {
    this.playerService.getPlayers(payload).subscribe((data: any) => {
      console.log(data);
      if (data.success) {
        this.playerList = data.data;
      }
    })
  }
}