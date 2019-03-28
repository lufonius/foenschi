import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import {NavigationItem} from "../models/navigation-item.model";
import {Observable, Subject} from "rxjs/index";
import {Navigation} from "../models/navigation.model";

@Injectable()
export class NavigationService {

 constructor(public db: AngularFirestore) { }

 public getNavigation(language: string): Observable<Navigation> {
    return <any>this.db
      .collection('languages')
      .doc(language)
      .valueChanges();
 }


}
