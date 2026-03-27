# GreenScoutJS

FRC team 1816's Scouting application, GreenScout! (Now in JavaScript!)

- How to update GH Pages:
  - Open la terminal
    1. First time:
       - Installations:
         ```
         npm install vite -g
         npm install -g create-vite
         npm i react@latest react-dom@latest
         npm install --save gh-pages
         npm install react-router-dom
         npm uninstall gh-pages -g
         npm install gh-pages@6.1.1 --save-dev -g
         ```
       - If you need to create a new app:
         ```
         npm create vite@latest greenscoutjs -- --template react
         echo -n > App.jsx && echo -n > index.css
         npm i react-router-dom --save styled-components
         ```
       - if broke: `rm -Force .\node_modules\.cache\gh-pages\`

    2. `vite build --base /GreenScoutJS`
    3. `gh-pages -d dist`

- How to run locally in browser (Assuming you have installed vite from above)
  1. `npm run dev`

  2. Open [http://localhost:5173/GreenScoutJS](http://localhost:5173/GreenScoutJS)
