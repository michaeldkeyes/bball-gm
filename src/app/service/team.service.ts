import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Team } from "../model/team.interface";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TeamService {
  constructor(private http: HttpClient) {}

  getTeam(id: number): Observable<Team> {
    return this.http.get<Team>(`http://localhost:8080/team/${id}`);
  }
}
