import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs/index";
import { AngularFirestore } from "@angular/fire/firestore";
import {Language} from "../models/language.model";

@Injectable()
export class LanguagesService {

 constructor(public db: AngularFirestore) { }

 getAvailableLanguages(): Observable<Language[]> {
   return <any>this.db
     .collection('availableLanguages')
     .valueChanges();
 }
}
