import type { Dispatch, SetStateAction } from 'react';
import { Subject, Subscription } from 'rxjs';

export interface Message {
  person: string;
  text: string;
}

export interface ChatState {
  data: Message[];
  newDataCount: number;
}

export default class ChatStore {
  private subject: Subject<ChatState>;

  private state: ChatState;

  constructor(public initialState: ChatState) {
    this.subject = new Subject<ChatState>();
    this.state = initialState;
  }

  get chatState(): ChatState {
    return this.state;
  }

  init(): void {
    this.state = { ...this.state, newDataCount: 0 };
    this.subject.next(this.state);
  }

  subscribe(setState: Dispatch<SetStateAction<ChatState>>): Subscription {
    return this.subject.subscribe(setState);
  }

  sendMessage(message: Message): void {
    this.state = {
      ...this.state,
      data: [...this.state.data, message],
      newDataCount: this.state.newDataCount + 1,
    };
    this.subject.next(this.state);
  }

  clearChat(): void {
    this.state = this.initialState;
    this.subject.next(this.state);
  }
}
