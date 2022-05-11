import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tela-Principal',
  templateUrl: './tela-Principal.component.html',
  styleUrls: ['./tela-Principal.component.css']
})
export class TelaPrincipalComponent implements OnInit {

  dropdownAberto = false;
  constructor() { }

  ngOnInit() {
  }

  dropDownToggle() {
    this.dropdownAberto = !this.dropdownAberto;
  }
}
