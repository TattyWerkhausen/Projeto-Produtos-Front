import { ClienteViewModelId } from './../cliente-view-model-id';
import { ClienteViewModel } from './../cliente-view-model';
import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-buscar-clientes',
  templateUrl: './buscar-clientes.component.html',
  styleUrls: ['./buscar-clientes.component.css']
})
export class BuscarClientesComponent implements OnInit {
  clientes: ClienteViewModelId[] = [];

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    this.clienteService.buscarTodosClientes().subscribe(result => { this.clientes = result });
  }
  buscarTodosClientes(): void {
    this.clienteService.buscarTodosClientes().subscribe(result => { this.clientes = result });
  }
}
