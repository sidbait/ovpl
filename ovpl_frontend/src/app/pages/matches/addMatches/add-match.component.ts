import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { TeamService } from "../../teams/team.service";
import { TournamentService } from "../../tournaments/tournament.service";
import { MatchService } from "../match.service";

@Component({
  selector: "app-add-match",
  templateUrl: "add-match.component.html"
})
export class AddMatchComponent implements OnInit {

  matchForm: FormGroup;
  match_id: any;
  tournamentList: any;
  teamList: any;

  constructor(
    private matchService: MatchService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private tournamentService: TournamentService,
    private teamService: TeamService,
  ) {

    this.match_id = this.activatedRoute.snapshot.params['match_id'];

  /*   this.teamForm = new FormGroup({
      team_name: new FormControl('', [Validators.required]),
      team_owner: new FormControl('', [Validators.required]),
      team_motto: new FormControl(''),
      status: new FormControl('', [Validators.required])
    }); */





  }

  initForm() {

    if (this.match_id) {
      
      const payload = {
        match_id: this.match_id
      }

      this.matchService.getMatches(payload).subscribe((data: any) => {
        console.log(data);
        if (data.success) {
          this.matchForm = new FormGroup({
            match_id: new FormControl(data.data[0].match_id, [Validators.required]),
            tournament_id : new FormControl(data.data[0].tournament_id, [Validators.required]),
            team_1 : new FormControl(data.data[0].team_1, [Validators.required]),
            team_2: new FormControl(data.data[0].team_2, [Validators.required]),
            toss_won: new FormControl(data.data[0].toss_won, [Validators.required]),
            toss_decision: new FormControl(data.data[0].toss_decision, [Validators.required]),
            wickets_per_inn : new FormControl(data.data[0].wickets_per_inn, [Validators.required]),
            overs_per_inn : new FormControl(data.data[0].overs_per_inn, [Validators.required]),
            max_overs_bowler: new FormControl(data.data[0].max_overs_bowler, [Validators.required]),
            mom: new FormControl(data.data[0].mom, [Validators.required]),
            label: new FormControl(data.data[0].label, [Validators.required]),
            status: new FormControl(data.data[0].status, [Validators.required])
          });
        } else {
          this.router.navigate(['/matches'])
        }
      })

    } else {
      this.matchForm = new FormGroup({
        match_id: new FormControl('', [Validators.required]),
        tournament_id: new FormControl('', [Validators.required]),
        team_1: new FormControl('', [Validators.required]),
        team_2: new FormControl('', [Validators.required]),
        toss_won: new FormControl('', [Validators.required]),
        toss_decision: new FormControl('', [Validators.required]),
        wickets_per_inn: new FormControl('', [Validators.required]),
        overs_per_inn: new FormControl('', [Validators.required]),
        max_overs_bowler: new FormControl('', [Validators.required]),
        mom: new FormControl('', [Validators.required]),
        label: new FormControl('', [Validators.required]),
        status: new FormControl('', [Validators.required])
      });
    }

  }

  ngOnInit() {

    console.log("Match", this.match_id);

    this.getTournaments();

    this.getTeams();

    this.initForm()

  }


  formSubmit() {
    if (this.match_id) {
      this.updateMatch()
    } else {
      this.addMatch()
    }
  }

  addMatch() {

    console.log("adadasd", this.matchForm.value);
    const payload = this.matchForm.value

    this.matchService.addMatch(payload).subscribe((data: any) => {
      console.log(data);

      if (data.success) {

        this.toastr.success(`<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> ${data.message}`, '', {
          disableTimeOut: false,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-success alert-with-icon",
        });

        this.router.navigate(['/matches'])
        
      } else {

        this.toastr.error(`<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> ${data.message}`, '', {
          disableTimeOut: false,
          enableHtml: true,
          closeButton: true,
          toastClass: "alert alert-danger alert-with-icon"
        });

      }

    })


  }

  updateMatch() {

    console.log("adadasd", this.matchForm.value);
    const payload = this.matchForm.value;
    payload.match_id = this.match_id;

    this.matchService.updateMatch(payload).subscribe((data: any) => {
      console.log(data);

      if (data.success) {

        this.toastr.success(`<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> ${data.message}`, '', {
          disableTimeOut: false,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-success alert-with-icon",
        });

        this.router.navigate(['/matches'])

      } else {

        this.toastr.error(`<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> ${data.message}`, '', {
          disableTimeOut: false,
          enableHtml: true,
          closeButton: true,
          toastClass: "alert alert-danger alert-with-icon"
        });

      }

    })


  }

  getTournaments(payload:any = {}) {
    this.tournamentService.getTournaments(payload).subscribe((data: any) => {
      console.log(data);
      if (data.success) {
        this.tournamentList = data.data;
      }
    })
  }

  getTeams(payload:any = {}) {
    this.teamService.getTeams(payload).subscribe((data: any) => {
      console.log(data);
      if (data.success) {
        this.teamList = data.data;
        console.log(this.teamList)
      }
    })
  }
  
}