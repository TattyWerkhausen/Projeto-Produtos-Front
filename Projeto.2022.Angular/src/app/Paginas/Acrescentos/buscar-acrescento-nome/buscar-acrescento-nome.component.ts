import { AcrescentoViewModelId } from './../acrescento-view-model-id';
import { AcrescentoService } from './../acrescento.service';
import { AcrescentoViewModel } from './../acrescento-view-model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buscar-acrescento-nome',
  templateUrl: './buscar-acrescento-nome.component.html',
  styleUrls: ['./buscar-acrescento-nome.component.css']
})
export class BuscarAcrescentoNomeComponent implements OnInit {
  formulario: FormGroup;
  acrescentos: AcrescentoViewModelId[] = [];

  constructor(private acrescentoService: AcrescentoService, private formBuilder: FormBuilder) {
    this.formulario = formBuilder.group({
      nome: formBuilder.control('')
    });
  }

  ngOnInit() {
  }
  buscarAcrescentoNome(): void {
    const nome = this.formulario.controls['nome'].value;
    this.acrescentoService.buscarNome(nome).subscribe((result) => { this.acrescentos.push(result) });
  }
}
