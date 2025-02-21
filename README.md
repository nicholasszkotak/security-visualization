## Introduction and Project Description

My idea for this project was to create an aggregation feed for IP addresses deemed "malicious", and to provide some visualizations on this data. 
Most of the sources defined in the original project description are feeds of bad actors - it stands to reason one could aggregate the IPs from these feeds 
into a single data store and provide analytics on them. I opted to gather data from the Abuse IPDB database, which provides an API and a 
"blacklist" call which returns IP addresses considered malicious within a given confidence interval - i.e. if I pass in a minimum of 90, I will receive IPs 
that are malicious with a confidence of 90% or greater. I also attempted to get some data from HoneyDB, but at the time of development their public API and site 
were flaky and ultimately unusable.

Abuse IPDB is the only feed of IPs I implemented but we could aggregate multiple feeds as desired, as long as the incoming data matches our expected contract - 
in this exercise that is just a list of IPs. That being said, a lot of these feeds don't have geolocation data, which limits visualization. I opted to also implement 
some cross-checking with IP Stack, a public API which will return basic geolocation data for a given set of IPs. For example, we can cross-match IPs to continent, country, 
region, city, zip, and latitude/longitude, all of which can be fed into a map visualization to show particular hotspots of threat. This could be useful information
for application developers implementing their own API access checks and blacklisting. 

The data is not meant to be real-time - instead, I have a method which gathers the data from these APIs, and ultimately stores it in the browser's 
browser. The user can add/edit/delete from this data set at will. We can also load data from static files located on the server. The idea in general here is that
a system may not need to provide real-time analytics at all times to provide end users. By storing it locally, we have more control over how we want to maintain and present that 
data. Underyling processes could load data from feeds at defined intervals, or you could also have some real-time streaming of data or changes to already-loaded 
data flowing into the larger system. This would keep systems operating tightly and efficiently, while giving the application its own agency to grow its own needs.

The system I've built offers two ways to load the data - by file or by API. The user sets some parameters for the load, clicks the button, and should see a raw
table of data. From there they can edit data as needed, add their own rows, remove rows that are not helpful. Unimplemented are common table visualizations such 
as pagination, sorting, and filtering, but those are all fairly standard functions that, given the underlying architecture, would be relatively trivial to apply.

I have also implemented a simple Google Maps implementation, tied directly to the data table. The map doesn't do anything special other than render the latitude 
and longitude values from the table on the map. Since these two components are tied by shared Redux state, updating values in the table should also coerce a change 
in the map. The map will not show unless data is loaded.

There's no way to upload changes to the data - this is because I'm not running a fully-functional backend service, only what create-react-app provides out of the 
box. However, the user should be able to make their own changes in browser and see those changes persist in the local data store and on any other visualization components. 
You could imagine, for example, a dashboard visualization that, given this single set of data, shows maps, charts, graphs, and reacts naturally to changes in 
the table.

## Checkout and Installation

1) If not already installed, go to https://nodejs.org/en/download/ and download and install the latest version of NodeJS.
2) If not already installed, go to https://git-scm.com/downloads and download and install the latest version of Git.
3) If not already installed, go to https://legacy.yarnpkg.com/en/docs/install/#windows-stable and download/install the latest version of Yarn.
4) Create a directory somewhere locally that will store the source code.
5) Open a console window, navigate to the directory, and clone in the repository by running ```git clone https://github.com/nickyskotes/contrast-exercise.git```. 
Alternative, you can also download the source code from this page.
6) Navigate into the cloned repository.
7) Run the following commands:

```
yarn
yarn start
```

This will install all NodeJS dependencies for the project, and start the development server.

8) When ```yarn start``` completes a browser window should open to http://localhost:3000 and the application should be usable.
9) To run unit tests, run ```yarn test```. In the test runner, if you open the watch options by pressing `w` you can choose to run all tests.

## Technology Choices

1) React - Per the exercise description, this implementation uses React as its web frontend library. IN particular I am using the latest version, React 16, although 
I am not relying on any specific features from this version. 

2) Redux - For state management, I have opted to implement a basic Redux store, as well as actions for communicating with this store. There is nothing special 
about the Redux implementation - actions are stored in the /actions folder and represent state changes requested from components. Reducers are stored in the 
/reducers folder and represent the business logic for handling the state changes. I did not use Redux for *ALL* of the state - in particular, I relied on React 
local state for limited form interactions - essentially anything in which the state is truly only within the component and not shared between any others. That 
being said, I also opted to implement a traditional React parent/child state reaction with the MainPage and DataLoaderSelector components, as an exercise to show 
the concept of lifting state to parent components. In production, I would likely stick to only Redux, or Redux except for state that does not leave the component.

3) Redux-Thunk - this Redux middleware library allows the base Redux to dispatch actions that return functions instead of only objects. In particular, this is used
whenever we want to have an asynchrous action, for example when we are loading a set of malicious IPs from APIs or from file. 

4) ES6 - Just a shoutout to using the most recent functionality ES6 provides, in particular the spread operator, which I use liberally to provide immutability 
support for Redux state - a requirement and general best practice when working with React code to ensure proper efficient rendering. I also make liberal use of 
async/await for interactions with promises - the base promise syntax is verbose, and async/await provides a streamlined, easy to understand mechanism for writing 
asynchronous code.

5) Bootstrap - For styling purposes, I have included the bootstrap library - no tweaks or anything special here, although I did lift some icons from other sources. 
Bootstrap is my usual go-to for responsive layout purposes, and I didn't make extensive use of it here - basically just whatever the Bootstrap 4 documentation 
suggested.

6) axios - For making asynchronous HTTP calls, I opted for the straightforward promise-based Axios library. My implementation only makes GET calls out to a few 
public APIs, as well as the backend server to fetch data from files. While I didn't need to implement much configuration for this project, axios is easily 
extended and configured for a variety of HTTP needs.

6) create-react-app - This application is created and deployed using the application bootstrap engine create-react-app, which gives us a local dev server and a 
baseline Webpack configuration, among other nice-to-haves. It's perfect for prototype applications such as an interview exercise, and thankfully provides the 
ability to eject into a more technical implementation if you wanted to take an application into a more custom solution. 

7) Jest - I've opted for Jest as the unit test runner, mainly because it comes bundled with create-react-app but also because it's considered the de facto test 
runner for React applications. 

8) Enzyme - Enzyme is a unit testing library for React components. In particular, I am using Enzyme's shallow renderering engine to test components without 
relying on a DOM engine.

9) Yarn - for a Node package manager I tend to default to Yarn, mainly from experience over NPM. Last I checked these days there weren't hugely significant 
differences between using this over NPM, although I find different engineers have fairly strong opinions. The create-react-app documentation mentions Yarn so 
ultimately that's what I opted to use.

## Technical Limitations

1) The calls to load data from the API unfortunately don't work as implemented, and I haven't been able to find a legitimate solution. Trying to communicate with 
the Abuse IPDB database through the application results in a CORS error - it works through Postman (which is how I sourced my data) so I'm not sure what's going on 
here, but a couple issues could be create-react-app's backing server configuration, as well as Abuse IPDB's API security (needing to call over HTTPS for example). 
IpStack calls seem to work from browser as expected, however I can't use their bulk API functionality due to different subscription tiers. I have written this to 
the best of my ability to show how I would go about implementing this, but I don't want to spend too much time trying to debug this in favor of showing off other 
aspects of my expertise.

2) I was originally going to implement some error handling, in particular I wanted to render the API errors I was receiving to the screen. The architecture would
be to let the service calls fail naturally, and let the action handler dispatch a GET_MALICIOUS_IPS_ERROR action with the payload being the exception - then we 
could store that exception and render it on screen in a Bootstrap error banner. I could have absolutely implemented this but for whatever reason, the API calls 
through async/await are just returning a bland "Network Error" issue. I want to be able to see the full error message for development purposes. For this reason I 
opted to skip this feature, although I would be happy to implement it if requested. In a production system I would never compromise on proper error handling.

3) For my limited form implementations, I opted not to worry about implementing a validation structure. In a production environment I support the idea of having 
both UX-driven client-side validation and data-integrity-driven backend validation, and would be happy to implement an example of validation on request.

## Architecture Description

The solution is designed as a standard React SPA built on top of the create-react-app bootstrap application. Both a backing Redux store and typical React 
state are used to store state in-memory. Async HTTP calls via axios promises are used to source data from the backend server and public APIs. 

When designing front-end apps, my goal is always to create a simple, composable tree of components. My first implementations had all the logic condensed into a 
single component, but I wanted to split out the different pieces - even if it unlikely the components will be shared, splitting apart components leads to solid 
design and reduced complexity.  I have the following component tree:

- App.js (hosts the app and sets up the wrapping Redux store)
  - MainPage.js (the main layout for the page, also contains an example of maintaining state for child components in the traditional React fashion)
    - DataLoaderSelector.js (a set of radio buttons which allows a user to select how they want to load data, lifting state up to MainPage)
	- LoadByFile.js (a form for setting values for loading data from a given file)
    - LoadByApi.js (a form for setting values for loading data from a set of APIs)
    - MaliciousIpsTable.js (a table of malicious IPs)
      - \[MaliciousIpTableRow.js\] (an array of rows in the table, offering CRUD support for the data in memory)
	- MaliciousIpsMapPresentation.js (a presentation element of the Google Maps)
	- MaliciousIpsMap.js (a composition of the presentation component with the other Google Maps and Redux HOCs to produce the actual map)

I opted not to implement any kind of TypeScript support, nor any other type-checking languages such as Flow or constructs such as React's PropTypes. I tend to 
find TS more trouble than its worth, especially when integrating with other libraries, and can easily be subverted. Type checking is not a waste of time, however - 
I prefer to enforce proper typing through unit testing and diligent code review practises, both of which should be enforced regardless of implementation. For an 
app like this, I would probably implement React PropTypes which offers run-time checking of types.

## Unit Tests

Unit tests are written with Jest, which comes packaged with create-react-app. For testing the React components specifically, I am making use of the Enzyme
library, in particular its shallow rendering engine. Tests are written following the Arrange-Act-Assert pattern, and follow my personal standards for writing JS
unit tests. I've opted away from a BDD/Gherkin/Given-When-Then style - I find that style much more well-suited for describing end-to-end and acceptance tests.

When testing components, I follow a suggestion from the Redux documentation - instead of importing the default Redux-connected component, instead import the class 
itself. This way, you don't have to mock up a Redux store for testing, and it helps enforce the notion that components are purely presentational and can usually 
be expressed as pure functions of properties.  

## Integration Tests
I have opted not to write integration tests for this exercise. Part of this is due to time constraints, but also part of it is because I am, and continue to be,
conflicted on their value when I write front-end applications. I struggle with finding the value between the unit tests and more thorough end-to-end tests, and in 
the past my teams have invested time in front-end integration tests but ultimately found them to be more struggle that it was worth. In particular we struggled 
with tests interfering with each other and causing tests to pass/fail that otherwise shouldn't - this was especially apparent if you ran the tests in watch mode. 
I'm not against the notion of writing integration tests, however - in fact I find them very valuable in general. I wanted to describe some of my own thoughts on the topic. 

1) Often integration tests are used to test the integration of React components together, through simulated user actions. Ultimately you want to see how your 
components render as data flows through the React application - it'll test all the properties are assigned correctly, and the overall lifecycle works. This is 
all fundamentally valuable. However, when I'm designing components, I'm striving for small, well-defined, well-separated sets of components running on purely 
defined and consistent architectural practices. What this means is that the components often don't have that much complexity to begin with, and aren't making 
significant use of lifecycle methods in the first place. In the unit tests, I test all of those methods and rendering logic via Enzyme, and the shallow rendering 
engine does naturally call the lifecycle methods as you may expect. One can make the argument of if that is truly coverage, or if you need to test the actual flow
of data through the system. That's a fair argument, but I ultimately lean toward covering that via automated end-to-end tests rather than a suite of targeted 
integration tests. If you *did* want to test this functionality, though, you can use Enzyme to set up these cases as needed - shallow rendering should do the 
trick in most cases, but they also have a "mount" engine which uses a virtual DOM to fully mount and render components.

2) I've heard the argument before that integration tests verify a system's interaction with Redux. This may be true for some implementations of backing state - for 
example, if I'm working on an Angular app that uses RxJS and I want to model streams of observable data and verify the application and all components react as 
desired, I'm more inclined to accept these tests. However, React/Redux offers a very nice separation of presentation from state, and React itself, with its 
clearly-defined unidirectional data flow and methods of reacting to state changes, doesn't leave much to test IMO. The unit tests are verifying that code is set up 
as expected, and you could hook up some data flowing through, but to me it starts to feel like the tests are just verifying that React and Redux do what they do. 
Again, I prefer to lean on end-to-end tests in this case.

3) Integration tests can verify integrations with our backing stores of data - in this case, it would be integration with the API endpoints. This is the same 
principal as testing integrations with databases on the backend, and just like that case, it can be tricky to set up and maintain in a discrete, repeatable fashion. 
One is beholden to the implementation and deployment of the API under the hood, and how easy it is to mock the data being returned from the endpoint. If you own the 
endpoint you can architect something that handles this case well, but in the case of third-party APIs it's trickier. In this project I'm interfacing with two APIs, 
both of which have rate limiting, underlying subscriptions, and security protocols in place that would need to be properly handled. If you are running a build of 
your system that is gated by the results of the integration tests, and these builds are happening on every commit ... you could potentially run afoul of rate 
caps, getting blacklisted by the API, violating usage agreements, and all sorts of other x-factors. 

At the end of the day, the team has to ask, what is the ROI on the work they do? All testing is valuable, and I would never stop a team from writing integration 
tests if they felt them valuable, and would certainly be open to evolving my own views. 