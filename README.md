# Running the project under docker

The project comes with a pre-made Dockerfile in order to build and serve under nginx the whole application.  
You can run build.sh in order to quickly get a sample container up, however it would be preferred to configure the container correctly.

The environment variables in `.env` have to be configured so that the container is initialized as intended, and points to the right services.


## Dependencies

This project was developed under NodeJS 16, other NodeJS runtimes may be able to compile the project, but you might encounter issues.  
This project also utilizes the following dependencies:

### Material UI

Material UI is a library of prebuilt components, making the work of designing the structure of a website during web development much simpler and easier.  
Grid is one of the primary component that is utilized for its easy usage for organizing a basic structure in a grid-like manner.

### Emotion

Emotion is required by Material UI, but it additionally allows modifying other components in order to create a new component that is stylized.  
This allows for having custom components with a static style for specific projects

### ReduxJS

Redux allows us to have a global state for our application.  
Whilst components can have their own states, and we can inject some of their info downwards to child components, redux makes this simple as you only need the global store for said states.  
Commonly we should store session info, current cart status, and similar in redux's store.

### I18Next

I18Next provides us with some simple yet powerful internationalization tools.  
By default, you would construct I18N with all the available translations, but they offer the dependency "i18next-http-backend", which will automatically load translations from public/locales

### lodash

lodash is an extension library primarily focused on delivering modularity, performance & extras.  

### RxJS

RxJS provides reactive extension in order to compose asynchronous and event-based programs by using observable sequences.  
It provides one core type, the Observable, satellite types (Observer, Schedulers, Subjects) and operators inspired by Array methods (map, filter, reduce, every, etc) to allow handling asynchronous events as collections.

### WebVitals

The web-vitals library is a modular library for measuring all the Web Vitals metrics on real users, in a way that accurately matches how they're measured by Chrome and reported to other Google tools (e.g. Chrome User Experience Report, Page Speed Insights, Search Console's Speed Report).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
