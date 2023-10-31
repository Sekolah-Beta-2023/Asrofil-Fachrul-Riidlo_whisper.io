# Whisper.io  

### Frontend
![Nuxtjs](https://img.shields.io/badge/Nuxt-002E3B?style=for-the-badge&logo=nuxtdotjs&logoColor=#00DC82) ![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![DaisyUI](https://img.shields.io/badge/daisyui-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white) 

### Backend
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101) ![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white) 

### Cloud
![Google Cloud](https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white) ![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white) ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) 

### CI-CD
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)

Simple functional web chat app with intuitive UI.  

![Screenshot App](/MD-assets/ss.png)

### Link Deploy

#### GCP (IaaS)

[main](http://asrofil-fachrul-riidlo.sanberdev.com/) | [alternative](http://34.101.112.132/)

above links will not work start from Nov 13, 2023 (end of my free tier plan). Please kindly wait because I'm considering to migrate the hosting to another IaaS that provide free tier plan or (last choice) using PaaS such as Vercel or Netlify. The migration process is undoubtly simple, I just need to register for new IaaS, set up the VM with basic setup like SSH and installing docker & NGINX, upload files script to the vm and update the secret key on github to target address vm. Once all set, i just need to run the script to execute docker-compose or I can directly test the CI-CD process by making test changes on the app and push it to trigger the jobs.

I prefer using IaaS because it can demonstrate my skill in Development-Operation (DevOps) side too. See my gist for the scripts I'm using on ops side:

- [trigger script](https://gist.github.com/asrofilfachrulr/025356b1e93366a1230833042a63ba0e)
- [docker-compose](https://gist.github.com/asrofilfachrulr/6f328d4843fc5c6b1103b01a207d1f44)
- [nginx conf](https://gist.github.com/asrofilfachrulr/98ed44fbac0c74a6b8f1098dfa9d9daa)

### Original Repo Link  

Frontend: [whisper.io](https://github.com/asrofilfachrulr/whisper.io)

Backend: [api.whisper.io](https://github.com/asrofilfachrulr/api.whisper.io)

Both original repo have been implemented CI/CD using github actions deployed to GCP through docker-hub pulling. Visit my [gist](https://gist.github.com/asrofilfachrulr) to view operation-related files on the VM

# Diagrams  

### Infrastructure

Diagram of Technincal Infrastructure (when app is previously hosted on IaaS)

![Diagram](/MD-assets/infra.jpg)

### App Activity

Diagram of App Activity

![Diagram](/MD-assets/activity.jpg)

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```
