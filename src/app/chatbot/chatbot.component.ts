import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  userInput: string = '';
  messages: Message[] = [
    { sender: 'bot', text: 'Hello! Ask me anything about Om Khade.' }
  ];
  loading: boolean = false;

  constructor(private http: HttpClient) {}

  sendMessage() {
    if (!this.userInput.trim() || this.loading) return;

    const userMessage = this.userInput.trim();
    this.messages.push({ sender: 'user', text: userMessage });
    this.userInput = '';
    this.loading = true;

    // Send payload to FastAPI
    this.http.post<{ answer: string }>(`${environment.apiUrl}/chat`, { message: userMessage })
      .subscribe({
        next: (response) => {
          this.messages.push({ sender: 'bot', text: response.answer });
          this.loading = false;
        },
        error: (err) => {
          console.error(err);
          this.messages.push({ sender: 'bot', text: 'Sorry, I couldn\'t fetch a response.' });
          this.loading = false;
        }
      });
  }
}
