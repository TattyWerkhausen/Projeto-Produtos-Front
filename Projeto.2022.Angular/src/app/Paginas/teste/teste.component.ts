import { MlViewModelTeste } from './endereco-teste.viewmodel';
import { TesteService } from './teste.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html'
})
export class TesteComponent implements OnInit {

  form: FormGroup;
  enderecoAdionadoId = 0;
  enderecosAdicionadosIds: number[] = [];
  mls: MlViewModelTeste[] = [];

  constructor(private _fb: FormBuilder, private service: TesteService) {
    this.form = this._fb.group({
      nome: this._fb.control(''),
      ml: _fb.control('')
    });

    this.service.buscarMls().subscribe({
      next: (mlsApi) => {
        this.mls = mlsApi;
      }
    })

    // this.service.buscarEnderecosPadroes().subscribe({
    //   next: enderecos => {
    //     enderecos.forEach(endereco => {
    //       this.addEndereco();
    //       const ultimoEnderecoIdAdicionado = this.enderecosAdicionadosIds[this.enderecosAdicionadosIds.length - 1];
    //       this.form.get('endereco-' + ultimoEnderecoIdAdicionado)?.setValue(endereco);
    //     });
    //     console.log(this.form);
    //   }
    // })

  }

  ngOnInit() {
  }

  addEndereco(): void {
    this.form.addControl('endereco-' + this.enderecoAdionadoId, this._fb.group({
      rua: this._fb.control(''),
      numero: this._fb.control('')
    }))

    this.enderecosAdicionadosIds.push(this.enderecoAdionadoId);
    this.enderecoAdionadoId++;
  }
}
