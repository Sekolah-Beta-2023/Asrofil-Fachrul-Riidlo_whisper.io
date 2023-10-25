# Whisper.io  

Simple functional web chat app with intuitive UI.  

![Screenshot App](/MD-assets/ss.png)

### Link Deploy

#### GCP (IaaS)

[main](http://asrofil-fachrul-riidlo.sanberdev.com/) | [alternative](http://34.101.112.132/)

above links will not work start from Nov 13, 2023 (end of my free tier plan). Please kindly wait because I'm considering to migrate the hosting to another IaaS that provide free tier plan or (last choice) using PaaS such as Vercel or Netlify. The migration process is undoubtly simple, I just need to register for new IaaS, set up the VM with basic setup like SSH and installing docker & NGINX, upload files script to the vm and update the secret key on github to target address vm. Once all set, i just need to run the script to execute docker-compose or I can directly test the CI-CD process by making test changes on the app and push it to trigger the jobs.

I prefer using IaaS because it can demonstrate my skill in Development-Operation (DevOps) side too.

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
