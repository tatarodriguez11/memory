Hello!
In order to reproduce this project in your local you must follow the following steps:

1. Clone the repository on your computer (you choose the location for that)
2. When you are located in the file that contains the project, you must run the command `npm i`
3. So that you can see it in the browser, you must run the npm run dev command and in your terminal the port where you can find it will be shown, generally you can find it at the following address: http://localhost:5173/


---------

If you want to skip all these steps and just enjoy the game, I invite you to visit the following link: https://quiet-kleicha-d732f5.netlify.app/


This project was deployed thanks to Netlify, since it will be a static page and it is easy to integrate with GitHub. If you have questions about how to do it, please read the following article: https://geekflare.com/es/deploy-frontend-app-to-netlify/

------

To improve:

- Add both unit and end-to-end tests, using Jest, Cypress or Playwright, or similars.
- Improve the design with the help of a designer.
- Improve appearance for small devices.
- Implement explanatory class names to each of the elements that make up the components following a standard such as BEM; At the moment it was not done because the className could be very long because Tailwind is being used. However; I was trying to show a little of the usage of BEM inside the component welcome.
- Add elements that improve accessibility for people with vision problems.
- Improve the visual of some images that look stretched, due to how they should be adapted to the measurements placed.
- Block clicks while we validate if the cards match
- Review correct charge of the page on android devices for restart game

All thing to improve mentioned above will improve the appearance of the app and will help in maintenance of it; however, as it's a test, you won't find them inside the code for the moment. If you want to add some of this identified improvements, feel free to request acces to add them.

Also, if you notice other improvement and it's not listed, feel free to let me know it.
