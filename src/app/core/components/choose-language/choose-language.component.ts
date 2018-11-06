import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Language} from "../../models/language.model";

@Component({
  selector: 'lf-choose-language',
  templateUrl: './choose-language.component.html',
  styleUrls: ['./choose-language.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChooseLanguageComponent implements OnInit {

  @Output() languageSelected: EventEmitter<string> = new EventEmitter<string>();
  @Input() languages: Language[] = [];

  constructor() { }

  ngOnInit() {
  }

  setSelectedLanguage(language: string) {
    this.languageSelected.emit(language);
  }

  getBackgroundImageStyle(url: string) {
    return `url(${url})`;
  }

}
