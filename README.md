# GreenScoutJS
FRC team 1816's Scouting application, GreenScout! (Now in JavaScript!)

* How to update GH Pages: 
    * Open la terminal
        * 1. First time:
                * Create App:
                    * npm install -g create-vite
                    * npm create vite@latest greenscoutjs -- --template react
                    * npm i react@latest react-dom@latest  
                    * echo -n > App.jsx && echo -n > index.css 
                    * npm i react-router-dom --save styled-components 
                    * npm install --save gh-pages            

                * npm install react-router-dom
                * npm uninstall gh-pages -g
                * npm install gh-pages@6.1.1 --save-dev -g

                * if broke:
                    *rm -Force .\node_modules\.cache\gh-pages\

        * 2. cd .\greenscoutjs\

        * 3. vite build --base /GreenScoutJS

        * 4. gh-pages -d dist

* How to run locally in browser (Assuming you have installed vite from above)
    * 1. cd .\greenscoutjs\

    * 2. npm run dev

    * 3. Open [text](http://localhost:5173/GreenScoutJS)