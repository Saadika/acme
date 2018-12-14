import { Component } from '@angular/core';

import { DataService } from './service/data.service';
import { AccountResponse } from './models/accountResponse.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'acme';
}
