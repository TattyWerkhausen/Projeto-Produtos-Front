import { Router } from '@angular/router';
import { ClienteService } from './../cliente.service';
import { ClienteViewModelId } from './../cliente-view-model-id';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buscar-cliente-id',
  templateUrl: './buscar-cliente-id.component.html',
  styleUrls: ['./buscar-cliente-id.component.css']
})
export class BuscarClienteIdComponent implements OnInit {
  formulario: FormGroup;
  clienteEncontrado?: ClienteViewModelId;

  exibirMensagemNaoEncontrado?: boolean;

  classAlerta = {
    vermelhoEscuro: 'vermelho-escuro',
    vermelhoClaro: 'vermelho-claro',
    resultado: ''
  }
  constructor(private clienteService: ClienteService
    , private formBuilder: FormBuilder
    , private rota: Router) {
    this.formulario = formBuilder.group({
      id: formBuilder.control('')
    });
    this.exibirMensagemNaoEncontrado = false;
  }

  ngOnInit() {
    setInterval(() => {
      if (this.classAlerta.resultado === this.classAlerta.vermelhoEscuro) {
        this.classAlerta.resultado = this.classAlerta.vermelhoClaro;
      }
      else if (this.classAlerta.resultado === this.classAlerta.vermelhoClaro) {
        this.classAlerta.resultado = this.classAlerta.vermelhoEscuro;
      }
    }, 300)
  }

  buscarClienteId(): void {
    const cliente = this.formulario.controls['id'].value;
    this.clienteService.buscarClienteId(cliente).subscribe((result) => {
      this.clienteEncontrado = result;
      if (result === undefined || result === null) {
        this.classAlerta.resultado = this.classAlerta.vermelhoEscuro;
      }
      this.exibirMensagemNaoEncontrado = true;
    });
  }
  clienteFoiEncontrado(): boolean {
    let clienteFoiAchado: boolean;
    if (this.clienteEncontrado !== undefined && this.clienteEncontrado !== null) {
      clienteFoiAchado = true;
    }
    else {
      clienteFoiAchado = false;
    }
    return clienteFoiAchado;
  }
  encerrarAposNadaEncontrado(): void {
    if (this.clienteFoiEncontrado() === undefined) {
      this.rota.navigateByUrl('/buscarCliente');
    }
    this.exibirMensagemNaoEncontrado = false;
      this.formulario.reset();
  }
}
