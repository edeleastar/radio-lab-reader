import { initializeApp } from "firebase/app";
import { getKeys } from "../environment";
import { getDatabase, remove, onValue, ref } from "firebase/database";
export class MessageStore {
    messageListener;
    constructor() {
        if (getKeys().firebase.apiKey !== "XXX") {
            initializeApp(getKeys().firebase);
            this.subscribeToMessages();
        }
    }
    messageUpdate(messages) {
        if (this.messageListener)
            this.messageListener(messages);
    }
    startMessageService(listener) {
        this.messageListener = listener;
        this.subscribeToMessages();
    }
    subscribeToMessages() {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const that = this;
        const db = getDatabase();
        const messagesRef = ref(db, `messages`);
        onValue(messagesRef, (snapshot) => {
            that.messageUpdate(snapshot.val());
        });
    }
    clearAllMessages() {
        const db = getDatabase();
        const messagesRef = ref(db, `messages`);
        remove(messagesRef);
    }
}
//# sourceMappingURL=message-store.js.map