import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  // Sobrescrevendo os dados da classe genérica
  tituloOriginal: string = 'Conheça nossa Coletânea';

  ngOnInit(): void {
  }

}
