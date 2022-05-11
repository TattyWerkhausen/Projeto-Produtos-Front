import { FuncionarioService } from './../funcionario.service';
import { FuncionarioViewModel } from './../funcionario-view-model';
import { Component, OnInit } from '@angular/core';
import { FuncionarioViewModelId } from '../funcionario-view-model-id';

@Component({
  selector: 'app-buscar-todos-funcionarios',
  templateUrl: './buscar-todos-funcionarios.component.html',
  styleUrls: ['./buscar-todos-funcionarios.component.css']
})
export class BuscarTodosFuncionariosComponent implements OnInit {
  funcionarios:FuncionarioViewModelId[]=[];

  constructor(private funcionarioService:FuncionarioService) { }

  ngOnInit() {
    this.funcionarioService.buscarTodosFuncionarios().subscribe(result => {this.funcionarios = result})
  }
buscarTodosFuncionarios():void{
  this.funcionarioService.buscarTodosFuncionarios().subscribe(result => {this.funcionarios = result})
}
}
