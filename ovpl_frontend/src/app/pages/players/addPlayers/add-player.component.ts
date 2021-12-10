import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { PlayerService } from "../player.service";

@Component({
  selector: "app-add-player",
  templateUrl: "add-player.component.html"
})
export class AddPlayerComponent implements OnInit {

  playerForm: FormGroup;
  player_id: any;

  constructor(
    private playerService: PlayerService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {

    this.player_id = this.activatedRoute.snapshot.params['player_id'];

  /*   this.teamForm = new FormGroup({
      team_name: new FormControl('', [Validators.required]),
      team_owner: new FormControl('', [Validators.required]),
      team_motto: new FormControl(''),
      status: new FormControl('', [Validators.required])
    }); */

    this.initForm()

  }

  initForm() {

    if (this.player_id) {
      
      const payload = {
        player_id: this.player_id
      }

      this.playerService.getPlayers(payload).subscribe((data: any) => {
        console.log(data);
        if (data.success) {
          this.playerForm = new FormGroup({
            player_name: new FormControl(data.data[0].player_name, [Validators.required]),
            player_bat: new FormControl(data.data[0].player_bat, [Validators.required]),
            player_bowl: new FormControl(data.data[0].player_bowl, [Validators.required]),
            player_wicket: new FormControl(data.data[0].player_wicket, [Validators.required]),
            player_captain: new FormControl(data.data[0].player_captain, [Validators.required]),
            status: new FormControl(data.data[0].status, [Validators.required])
          });
        } else {
          this.router.navigate(['/players'])
        }
      })

    } else {
      this.playerForm = new FormGroup({
        player_name: new FormControl('', [Validators.required]),
        player_bat: new FormControl('', [Validators.required]),
        player_bowl: new FormControl('', [Validators.required]),
        player_wicket: new FormControl('', [Validators.required]),
        player_captain: new FormControl('', [Validators.required]),
        status: new FormControl('', [Validators.required])
      });
    }

  }

  ngOnInit() {

    console.log("Player", this.player_id);

  }


  formSubmit() {
    if (this.player_id) {
      this.updatePlayer()
    } else {
      this.addPlayer()
    }
  }

  addPlayer() {

    console.log("adadasd", this.playerForm.value);
    const payload = this.playerForm.value

    this.playerService.addPlayer(payload).subscribe((data: any) => {
      console.log(data);

      if (data.success) {

        this.toastr.success(`<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> ${data.message}`, '', {
          disableTimeOut: false,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-success alert-with-icon",
        });

        this.router.navigate(['/players'])

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

  updatePlayer() {

    console.log("adadasd", this.playerForm.value);
    const payload = this.playerForm.value;
    payload.player_id = this.player_id;

    this.playerService.updatePlayer(payload).subscribe((data: any) => {
      console.log(data);

      if (data.success) {

        this.toastr.success(`<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> ${data.message}`, '', {
          disableTimeOut: false,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-success alert-with-icon",
        });

        this.router.navigate(['/players'])

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