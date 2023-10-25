# Whisper.io  

Simple functional web chat app with intuitive UI.  

![Screenshot App](/MD-assets/ss.png)

### Link Deploy

#### GCP (IaaS)

[main](http://asrofil-fachrul-riidlo.sanberdev.com/) | [alternative](http://34.101.112.132/)

above links will not work start from Nov 13, 2023 (end of my free tier plan). Please kindly wait because I'm considering to migrate the hosting to another IaaS that provide free tier plan or using PaaS such as Vercel or Netlify

### Original Repo Link  

Frontend: [whisper.io](https://github.com/asrofilfachrulr/whisper.io)

Backend: [api.whisper.io](https://github.com/asrofilfachrulr/api.whisper.io)

Both original repo have been implemented CI/CD using github actions deployed to GCP through docker-hub pulling.

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
