import { Injectable } from '@angular/core';
import { Observable } from "rxjs/index";
import { AngularFirestore } from "angularfire2/firestore";
import {Language} from "../models/language.model";

@Injectable()
export class LanguagesService {

 constructor(private db: AngularFirestore) { }

 getAvailableLanguages(): Observable<Language[]> {
   return <any>this.db
     .collection('availableLanguages')
     .valueChanges();
 }
}
