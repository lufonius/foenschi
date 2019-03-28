import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import {Project} from "../models/project.view-model";
import { Observable, from} from "rxjs";
import {ProjectBlock} from "../models/project-block.view-model";
import {ProjectFile} from "../models/project-files.view-model";
import {mergeMap, map } from "rxjs/operators";
import {ProjectDetailPage} from "../models/project-detail-page.view-model";
import {ResumePage} from "../models/resume-page.view-model";


@Injectable({
  providedIn: 'root'
})
export class ResumePageService {

  constructor(public db: AngularFirestore) { }

  public getResumePage(language: string): Observable<ResumePage> {
    const resumePageRef = this.db
      .collection('languages')
      .doc(language)
      .collection('resumePage').ref;

    const personalInfoRef = resumePageRef
      .doc('personalInfo');

    const personalInfoFieldsRef = personalInfoRef
      .collection('fields')
      .orderBy('order', 'asc');

    const headingRef = resumePageRef
      .doc('heading');

    const historyRef = resumePageRef
      .doc('history')
      .collection('steps')
      .orderBy('order', 'asc');

    return from(Promise.all([
      personalInfoRef.get(),
      personalInfoFieldsRef.get(),
      headingRef.get(),
      historyRef.get()
    ])).pipe(
      map(refs => {
        return <ResumePage>{
          personalInfo: {
            ...refs[0].data(),
            fields: refs[1].docs.map( doc => doc.data())
          },
          history: refs[3].docs.map(doc => doc.data()),
          heading: {
            ...refs[2].data()
          }
        }
      })
    );
  }
}
