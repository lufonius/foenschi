import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import {Project} from "../models/project.view-model";
import {Observable} from "rxjs/index";
import {ProjectBlock} from "../models/project-block.view-model";
import {ProjectFile} from "../models/project-files.view-model";
import {mergeMap, map} from "rxjs/operators";
import {ProjectDetailPage} from "../models/project-detail-page.view-model";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(public db: AngularFirestore) { }

  public getProjects(language: string, projectId?: string): Observable<Project[] | Project> {
    let projects$ = this.db
      .collection('languages')
      .doc(language)
      .collection('project', ref => ref.orderBy('order', 'asc'));

    if(projectId) {
      return <any>projects$.doc(projectId).valueChanges();
    }

    return <any>projects$.valueChanges();
  }

  public getBlocksForProject(language: string, projectId: string): Observable<ProjectBlock[]> {
    return <any>this.db
      .collection('languages')
      .doc(language)
      .collection('project')
      .doc(projectId)
      .collection('blocks', ref => ref.orderBy('order'))
      .valueChanges();
  }

  public getFilesForProject(language: string, projectId: string): Observable<ProjectFile[]> {
    return <any>this.db
      .collection('languages')
      .doc(language)
      .collection('project')
      .doc(projectId)
      .collection('files')
      .valueChanges();
  }

  public getProjectDetailPage(language: string, projectName: string): Observable<Partial<ProjectDetailPage>> {
    const projects$ = this.getProjects(language, projectName);
    const blocks$ = this.getBlocksForProject(language, projectName);
    const files$ = this.getFilesForProject(language, projectName);
    const static$ = this.db
      .collection('languages')
      .doc(language)
      .collection('projectDetailPage')
      .doc('files')
      .valueChanges();

    return projects$.pipe(mergeMap((project: Project) => {
      return blocks$.pipe(mergeMap((blocks: ProjectBlock[]) => {
        return files$.pipe(mergeMap((files: ProjectFile[]) => {
          return static$.pipe(map((staticFields: ProjectFile) => {
            project.blocks = blocks;
            project.files = files;
            return {
              project: project,
              file: staticFields
            }
          }))
        }));
      }));
    }));
  }
}
