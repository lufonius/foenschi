import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Language} from "../../models/language.model";

@Component({
  selector: 'lf-language-list',
  templateUrl: './language-list.component.html',
  styleUrls: ['./language-list.component.scss']
})
export class LanguageListComponent {

  @Input() languages: Language[] = [];
  @Output() languageClicked = new EventEmitter<Language>();

  languageClick(language: Language) {
    this.languageClicked.emit(language);
  }

  getBackgroundImageStyle(url: string) {
    return `url(${url})`;
  }
}
