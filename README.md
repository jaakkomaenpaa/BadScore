# BWF Tournament Results

A site to view real-life results from BWF (Badminton World Federation) tournaments.

I did not like the UX of BWF's redesigned tournament result platform so I decided to create a more convenient one myself.

This is a personal project and not affiliated with BWF in any way.

BWF website: https://bwfbadminton.com/

## Features

As of 8.3.2025 the site has the following features:
- Tournament search
- Match results
- Brackets & standings
- Entry lists 
- Official rankings
- Player search
- Player profiles and match history

## Challenges

The API from which the data is fetched uses very different models for similar kind of data.
E.g. the response for a match object in the tournament route is notably different from the match object on the player route. 

This makes the frontend types somewhat messy, and in some cases prevents component reusability.

## Running locally

Note that these instructions have only been tested with PowerShell on Windows 11 

**Clone the repository**
```bash
git clone https://github.com/jaakkomaenpaa/BadScore.git
 ```

### Server

***

**Navigate to server**
```bash 
cd server
```

**Add environment variables**

In the server root, add .env file with  
```bash 
AUTH_TOKEN=
API_URL=
FLAG_URL="https://extranet.bwf.sport/docs/flags-svg/"
```
where auth token is your token to the BWF website, and api url is the BWF API URL ending with /api. 

These can be found on the Network tab of Chrome DevTools by inspecting an xhr request starting with *vue-* on https://bwfbadminton.com/calendar/, for example.

**Run server**

With Docker:
```bash 
docker compose build
docker compose up
```

Or in console:

```bash 
pip install -r requirements.txt
```
```bash 
$env:PYTHONPATH = "src"
python -m src.main
```

Server will start on the port indicated in the console, i.e.
- http://127.0.0.1:8000 for Docker, or
- http://127.0.0.1:5000 for console start

### Client

***

**Navigate to client**
```bash 
cd client
```

**Install dependencies**
```bash 
npm install
```

**Add environment variables**

In the client root, add .env file  
```bash 
VITE_API_URL=
```
with the url where your server runs.

**Run application**
```bash 
npm run dev
```
