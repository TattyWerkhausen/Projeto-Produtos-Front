import { BebidaModelId } from './../bebida-model-id';
import { BebidaModel } from './../bebida-model';
import { BebidaService } from './../bebida.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buscar-Bebidas',
  templateUrl: './buscar-Bebidas.component.html',
  styleUrls: ['./buscar-Bebidas.component.css']
})
export class BuscarBebidasComponent implements OnInit {
  bebidas: BebidaModelId[] = [];
  constructor(private bebidaService: BebidaService) { }

  ngOnInit() {
    this.bebidaService.buscarTodasBebidas().subscribe(todasBebidas => { this.bebidas = todasBebidas });
  }
  buscarTodasBebidas(): void {
    this.bebidaService.buscarTodasBebidas().subscribe(todasBebidas => { this.bebidas = todasBebidas });
  }
}
