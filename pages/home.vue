<template>
  <div id="home-root" class="index relative">
    <div
      v-if="isLoading"
      class="absolute w-full h-full overflow-hidden m-0 p-0 flex justify-center items-center bg-black/40 z-50 flex-col gap-3"
    >
      <span class="loading loading-ring loading-lg"></span>
      <span class="font-semibold">{{ loadingText }}</span>
    </div>
    <main
      class="h-screen w-screen flex flex-col justify-center items-center relative"
    >
      <div
        v-if="isShowAlert"
        class="absolute top-6 left-0 w-full flex justify-center overflow-hidden"
      >
        <HomeAlert />
      </div>
      <HomeDebugLoginfo
        v-if="clientWidth >= 768"
        :class="'absolute bottom-2 right-4'"
      />
      <button
        v-if="isDebugging"
        class="btn absolute bottom-16 right-4 hidden md:inline-flex"
        onclick="home_modal.showModal()"
      >
        Clear Data
      </button>
      <HomeModalDummyData />
      <component v-if="homeEventName" :is="modalComponent" />
      <Home>
        <div
          v-if="clientWidth >= 768"
          class="h-full w-full overflow-hidden block md:flex flex-nowrap"
        >
          <HomeSidebar :id="'home-sidebar'" />
          <HomeContentbar :id="'home-contentbar'" />
        </div>
        <div
          v-else
          class="h-full w-full overflow-hidden block md:flex flex-nowrap"
        >
          <HomeSidebar
            v-if="mobileContext === 'sidebar'"
            :id="'home-sidebar'"
          />
          <HomeContentbar
            v-else-if="mobileContext === 'contentbar'"
            :id="'home-contentbar'"
          />
        </div>
      </Home>
    </main>
  </div>
</template>

<script>
import HomeModalNewWhisper from "../components/Home/Modal/New/Whisper";
import HomeModalNewContact from "../components/Home/Modal/New/Contact";
import HomeModalConfirmationYesNo from "../components/Home/Modal/Confirmation/YesNo";
import HomeModalAction from "../components/Home/Modal/Action";
import ModalEmpty from "../components/Modal/Empty";
import { v4 as uuidv4 } from "uuid";

export default {
  head() {
    return {
      title: "Home",
      meta: [
        {
          hid: "Whisper.io User Home",
          name: "Whisper.io User Home",
          content: "Whisper.io User Home",
        },
      ],
    };
  },
  data() {
    return {};
  },
  computed: {
    isLoading() {
      return this.$store.getters["page/home/isLoading"];
    },
    loadingText() {
      return this.$store.getters["page/home/loadingText"];
    },
    chatId() {
      return this.$store.getters["chats/selectedChatId"];
    },
    mobileContext() {
      return this.$store.getters["page/home/getMobileContext"];
    },

    clientWidth() {
      return this.$store.getters["page/home/getClientWidth"];
    },

    isShowAlert() {
      return this.$store.getters["page/home/alertShow"];
    },

    homeEventName() {
      return this.$store.getters["page/home/eventName"];
    },
    modalComponent() {
      switch (this.homeEventName) {
        case "new-whisper":
          return HomeModalNewWhisper;
        case "new-contact":
          return HomeModalNewContact;
        case "yesno-confirmation":
          return HomeModalConfirmationYesNo;
        case "action":
          return HomeModalAction;
        default:
          return ModalEmpty;
      }
    },
    socketStatus() {
      return this.$store.getters["socket/status"];
    },
    isDebugging() {
      return this.$route.query.debug;
    },
  },
  watch: {
    socketStatus(newVal, oldVal) {
      console.log(
        `[PLUGINS: INFO] Socket Status Change: ${oldVal} => ${newVal}`
      );
      if (newVal === "connected" && oldVal === "disconnected")
        this.registerId();
    },
  },
  middleware: ["auth"],
  methods: {
    async fetchData() {
      this.$store.commit("page/home/NEW_LOADING", {
        status: true,
        text: "Fetching data...",
      });
      try {
        await this.$store.dispatch("contacts/fetchData");
        await this.$store.dispatch("chats/fetchData");

        for (let chat of this.$store.getters["chats/items"])
          await this.$store.dispatch("messages/fetchData", chat.id);

        await new Promise((resolve) => {
          setTimeout(() => resolve(), 2500);
        });
      } catch (e) {}
      this.$store.commit("page/home/CLEAR_LOADING");
    },
    setupSocketForChat() {
      this.registerId();
      this.waitIncomingMessage();
    },
    waitIncomingMessage() {
      console.log("[PLUGINS: INFO] Waiting for incoming message...");
      this.$socket.on("receive-message", (data) => {
        console.log("[PLUGINS: INFO] RECEIVED NEW MESSAGE: ", data);

        const { content, sender, time, messageId, chatId } = data;
        
        const participants = [this.$auth.user.id, data.sender];

        const msg = {
          sender_id: sender,
          content,
          time: new Date(time),
          chat_id: chatId,
          id: messageId,
          isRead: true,
          isDelivered: true
        };
        
        if(!this.$store.getters["chats/chatById"](chatId)){
          this.$store.commit("chats/PUSH_CHAT", {
            id: chatId,
            participants,
            time: msg.time,
            messages: [msg],
          });
        } else {
          this.$store.commit("chats/PUSH_MESSAGE_BY_ID", {id: chatId, msg})
        }
      });
    },
    registerId() {
      console.log("[PLUGINS: INFO] Registering id to create room");
      this.$socket.emit("register-id", this.$auth.user.id);
    },
    loadContactDummy() {
      console.log("[INFO] Load contact dummy");
      const contacts = this.$store.getters["contactDummy/items"];
      console.log("[INFO] Set contact dummy to contacts");
      this.$store.commit(
        "contacts/SET_CONTACTS",
        contacts.map((contact) => ({
          id: contact.id,
          full_name: contact.full_name,
          last_seen: "online",
          username: contact.username,
        }))
      );
    },
    loadChatDummy() {
      this.loadContactDummy();
      console.log("[INFO] Load chat dummy");
      const chat = this.$store.getters["chatDummy/item"];
      console.log("[INFO] Set chat dummy to chats");
      this.$store.commit("chats/PUSH_CHAT", chat);
    },
    updateInnerWidth() {
      this.$store.commit("page/home/SET_CLIENT_WIDTH", window.innerWidth);
    },
  },
  mounted() {
    window.addEventListener("resize", this.updateInnerWidth);

    console.log("[INFO] Connecting to socket..");
    this.setupSocketForChat();

    console.log("[INFO] Fetching data..");
    this.fetchData();

    if (this.isDebugging) {
      this.$store.commit("contacts/_CLEAR_DATA");
      this.$store.commit("chats/_CLEAR_DATA");

      this.loadContactDummy();
      this.loadChatDummy();
    }

    console.log("[DEBUG] initial Window innerWidth: ", window.innerWidth);
    this.$store.commit("page/home/SET_CLIENT_WIDTH", window.innerWidth);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateInnerWidth);
  },
};
</script>

<style>
html:has(#home-root) {
  height: -webkit-fill-available;
}
body:has(#home-root) {
  min-height: 100vh;
  min-height: -webkit-fill-available;
  overflow: hidden;
}

body .index {
  position: fixed;
  inset: 0;
  overflow: auto;

  display: grid;
  place-items: center;
}
</style>