import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { SkillsPage } from '../models/skills-page.view-model';
import { Observable } from 'rxjs/index';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import { SkillGroup } from '../models/skill-group.view-model';
import { mergeMap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class SkillsPageService {
	constructor(public db: AngularFirestore) {}

	public getSkillsPage(language: string): Observable<SkillsPage> {
		let skillGroups$ = this.db
			.collection('languages')
			.doc(language)
			.collection('skillsPage')
			.doc('groups')
			.valueChanges();

		let skillPageHeading$ = this.db
			.collection('languages')
			.doc(language)
			.collection('skillsPage')
			.doc('heading')
			.valueChanges();

		return <any>skillGroups$.pipe(
			mergeMap((groups) =>
				skillPageHeading$.pipe(
					map((heading) => {
						return { heading, groups };
					})
				)
			)
		);
	}
}
