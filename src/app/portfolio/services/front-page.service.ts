import { Injectable } from '@angular/core';
import {AngularFirestore, QuerySnapshot} from "@angular/fire/firestore";
import {FrontPage} from "../models/front-page.view-model";
import {from, Observable, Subject} from "rxjs/index";
import {map, } from "rxjs/operators";
import * as _ from 'lodash';


@Injectable({
  providedIn: 'root'
})
export class FrontPageService {

  constructor(public db: AngularFirestore) { }

  public getFrontPage(language: string): Observable<FrontPage> {
    let frontPageSnapshot$ =
      this.db
        .collection("languages")
        .doc(language)
        .collection("frontPage")
        .snapshotChanges()
        .pipe(
          map(actions => actions.map(action => {
            const id = action.payload.doc.id;
            const data = action.payload.doc.data();
            return { id, ...data }
          })),
          map(actions => _.mapKeys(actions, action => action.id)),
          map(actions => _.mapValues(actions, action => _.omit(action, ['id'])))
        );

    return <any>frontPageSnapshot$;
  }
}
