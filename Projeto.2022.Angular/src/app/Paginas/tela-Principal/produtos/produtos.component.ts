import { BebidaService } from '../../Bebidas/bebida.service';
import { BebidaModelId } from '../../Bebidas/bebida-model-id';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {
  bebidas:BebidaModelId[]=[];
  constructor(private bebidaService:BebidaService) { }

  ngOnInit() {
      this.bebidaService.buscarTodasBebidas().subscribe(todasBebidas => {this.bebidas = todasBebidas});
      }
  }


