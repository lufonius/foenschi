import { Injectable } from '@angular/core';
import { AngularFirestore } from "angularfire2/firestore";
import {Project} from "../models/project.view-model";
import {Observable} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private db: AngularFirestore) { }

  public getProjects(language: string): Observable<Project[]> {
    return <any>this.db
      .collection('languages')
      .doc(language)
      .collection('project')
      .valueChanges();
  }
}
