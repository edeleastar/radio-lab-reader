import {initializeApp} from "firebase/app";
import {getKeys} from "../environment";
import {getDatabase, remove, onValue, ref} from "firebase/database";

export type MessageListener = (messages: any) => void;

export class MessageStore {

  messageListener: MessageListener | undefined;

  constructor() {
    if (getKeys().firebase.apiKey !== "XXX") {
      initializeApp(getKeys().firebase);
      this.subscribeToMessages();
    }
  }

  messageUpdate(messages: any) {
    if (this.messageListener) this.messageListener(messages)
  }

  startMessageService(listener: MessageListener) {
    this.messageListener = listener;
    this.subscribeToMessages();
  }

  subscribeToMessages(): void {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    const db = getDatabase();
    const messagesRef = ref(db, `messages`);
    onValue(messagesRef, (snapshot) => {
      that.messageUpdate(snapshot.val());
    });
  }

  clearAllMessages() : void {
    const db = getDatabase();
    const messagesRef = ref(db, `messages`);
    remove(messagesRef);
  }
}
