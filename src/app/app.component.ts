import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'personal-chatbot-frontend';
  isChatOpen = false;

  toggleChat(): void {
    this.isChatOpen = !this.isChatOpen;
  }
}
