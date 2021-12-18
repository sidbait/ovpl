import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapComponent } from "../../pages/map/map.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UserComponent } from "../../pages/user/user.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
import { TeamsComponent } from "src/app/pages/teams/viewTeams/teams.component";
import { AddTeamComponent } from "src/app/pages/teams/addTeams/add-team.component";
import { PlayersComponent } from "src/app/pages/players/viewPlayers/players.component";
import { AddPlayerComponent } from "src/app/pages/players/addPlayers/add-player.component";
import { TournamentsComponent } from "src/app/pages/tournaments/viewTournaments/tournaments.component";
import { AddTournamentComponent } from "src/app/pages/tournaments/addTournaments/add-tournament.component";

// import { RtlComponent } from "../../pages/rtl/rtl.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "teams", component: TeamsComponent },
  { path: "add-team/:team_id", component: AddTeamComponent },
  { path: "icons", component: IconsComponent },
  { path: "maps", component: MapComponent },
  { path: "notifications", component: NotificationsComponent },
  { path: "user", component: UserComponent },
  { path: "tables", component: TablesComponent },
  { path: "typography", component: TypographyComponent },
  { path: "players", component: PlayersComponent},
  { path: "add-player/:player_id", component: AddPlayerComponent},
  { path: "tournaments", component: TournamentsComponent},
  { path: "add-tournament/:tournament_id", component:AddTournamentComponent }
  
  // { path: "rtl", component: RtlComponent }
];
