import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { TeamService } from "../team.service";

@Component({
  selector: "app-add-team",
  templateUrl: "add-team.component.html"
})
export class AddTeamComponent implements OnInit {

  teamForm: FormGroup;
  team_id: any;

  constructor(
    private teamService: TeamService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {

    this.team_id = this.activatedRoute.snapshot.params['team_id'];

  /*   this.teamForm = new FormGroup({
      team_name: new FormControl('', [Validators.required]),
      team_owner: new FormControl('', [Validators.required]),
      team_motto: new FormControl(''),
      status: new FormControl('', [Validators.required])
    }); */

    this.initForm()

  }

  initForm() {

    if (this.team_id) {
      
      const payload = {
        team_id: this.team_id
      }

      this.teamService.getTeams(payload).subscribe((data: any) => {
        console.log(data);
        if (data.success) {
          this.teamForm = new FormGroup({
            team_name: new FormControl(data.data[0].team_name, [Validators.required]),
            team_owner: new FormControl(data.data[0].team_owner, [Validators.required]),
            team_motto: new FormControl(data.data[0].team_motto),
            status: new FormControl(data.data[0].status, [Validators.required])
          });
        } else {
          this.router.navigate(['/teams'])
        }
      })

    } else {
      this.teamForm = new FormGroup({
        team_name: new FormControl('', [Validators.required]),
        team_owner: new FormControl('', [Validators.required]),
        team_motto: new FormControl(''),
        status: new FormControl('', [Validators.required])
      });
    }

  }

  ngOnInit() {

    console.log("Team", this.team_id);

  }


  formSubmit() {
    if (this.team_id) {
      this.updateTeam()
    } else {
      this.addTeam()
    }
  }

  addTeam() {

    console.log("adadasd", this.teamForm.value);
    const payload = this.teamForm.value

    this.teamService.addTeam(payload).subscribe((data: any) => {
      console.log(data);

      if (data.success) {

        this.toastr.success(`<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> ${data.message}`, '', {
          disableTimeOut: false,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-success alert-with-icon",
        });

        this.router.navigate(['/teams'])

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

  updateTeam() {

    console.log("adadasd", this.teamForm.value);
    const payload = this.teamForm.value;
    payload.team_id = this.team_id;

    this.teamService.updateTeam(payload).subscribe((data: any) => {
      console.log(data);

      if (data.success) {

        this.toastr.success(`<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> ${data.message}`, '', {
          disableTimeOut: false,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-success alert-with-icon",
        });

        this.router.navigate(['/teams'])

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
