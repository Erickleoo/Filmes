import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  // usando o decorator input para compartilhar dados com outros componentes!
  @Input() tituloGenerico: string | undefined;
  @Input() subtituloGenerico: string | undefined;

  ngOnInit(): void {
  }

}
