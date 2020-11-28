import { Component, OnInit } from '@angular/core';
import { phrases as PHRS } from '../core/data/phrases';
import { Phrase } from '../core/models/phrase';

@Component({
  selector: 'app-phrase-list',
  templateUrl: './phrase-list.component.html',
  styleUrls: ['./phrase-list.component.css']
})
export class PhraseListComponent implements OnInit {
  phrases: Phrase[] = PHRS.slice();

  currentValue: string;
  currentLanguage: string;

  constructor() {
   }

  ngOnInit(): void {
  }
  addPhrase(): void {
    this.phrases.push({ value: this.currentValue, language: this.currentLanguage})
  }

}
