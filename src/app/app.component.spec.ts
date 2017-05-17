import { BrowserTestingModule } from '@angular/platform-browser/testing';
import { WsService } from './ws.service';
import { FormsModule } from '@angular/forms';
import { PinConfigComponent } from './pin-config/pin-config.component';
import { PinComponent } from './pin/pin.component';
import { PinListComponent } from './pin-list/pin-list.component';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      declarations: [
        AppComponent,
        PinListComponent,
        PinComponent,
        PinConfigComponent
      ],
      providers: [
        WsService
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
