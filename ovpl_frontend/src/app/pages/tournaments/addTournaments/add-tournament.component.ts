import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { TournamentService } from "../tournament.service";

@Component({
  selector: "app-add-tournament",
  templateUrl: "add-tournament.component.html"
})
export class AddTournamentComponent implements OnInit {

  tournamentForm: FormGroup;
  tournament_id: any;

  constructor(
    private tournamentService: TournamentService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {

    this.tournament_id = this.activatedRoute.snapshot.params['tournament_id'];

  /*   this.teamForm = new FormGroup({
      team_name: new FormControl('', [Validators.required]),
      team_owner: new FormControl('', [Validators.required]),
      team_motto: new FormControl(''),
      status: new FormControl('', [Validators.required])
    }); */

    this.initForm()

  }

  initForm() {

    if (this.tournament_id) {
      
      const payload = {
        tournament_id: this.tournament_id
      }

      this.tournamentService.getTournaments(payload).subscribe((data: any) => {
        console.log(data);
        if (data.success) {
          this.tournamentForm = new FormGroup({
            tournament_name: new FormControl(data.data[0].tournament_name, [Validators.required]),
            label: new FormControl(data.data[0].label, [Validators.required]),
            duration: new FormControl(data.data[0].duration),
            
          });
        } else {
          this.router.navigate(['/tournaments'])
        }
      })

    } else {
      this.tournamentForm = new FormGroup({
        tournament_name: new FormControl('', [Validators.required]),
        label: new FormControl('', [Validators.required]),
        duration: new FormControl(''),
      
      });
    }

  }

  ngOnInit() {

    console.log("tournament", this.tournament_id);

  }


  formSubmit() {
    if (this.tournament_id) {
      this.updateTournament()
    } else {
      this.addTournament()
    }
  }

  addTournament() {

    console.log("adadasd", this.tournamentForm.value);
    const payload = this.tournamentForm.value

    this.tournamentService.addTournament(payload).subscribe((data: any) => {
      console.log(data);

      if (data.success) {

        this.toastr.success(`<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> ${data.message}`, '', {
          disableTimeOut: false,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-success alert-with-icon",
        });

        this.router.navigate(['/tournaments'])

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

  updateTournament() {

    console.log("adadasd", this.tournamentForm.value);
    const payload = this.tournamentForm.value;
    payload.tournament_id = this.tournament_id;

    this.tournamentService.updateTournament(payload).subscribe((data: any) => {
      console.log(data);

      if (data.success) {

        this.toastr.success(`<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> ${data.message}`, '', {
          disableTimeOut: false,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-success alert-with-icon",
        });

        this.router.navigate(['/tournaments'])

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
}
