# 3form Ceilings Design Tool

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.2.0.

## Development server

The development server must be run with SSL and use the 3form wildcard cert in order to avoid any issues with CORS. In order to do that you will need to aquire the SSL key and certificate file from a 3form team member. The recommendation is to place them into a folder in the `src/ssl` folder so that the command below works.

Run `ng serve --host dev-ng.3-form.com --ssl true --ssl-key ssl/wildcard.key --ssl-cert ssl/wildcard.crt` for a dev server. Navigate to `https://dev-ng.3-from.com:4200/`. The app will automatically reload if you change any of the source files.

## Debugging Service
We have implemented the [Debug](https://github.com/visionmedia/debug) JS library for logging our app. This has the advantage of allowing us to create helpful logging messages and send them to the production server. We can do this because the logging is disabled by default. The advantage, is that we can turn on the logging for our browser only in order to debug the live environment.

The Debug library has been added as a service. You must include the service in any component, directive, pipe, service, class, or module that you want to log from. You do this by adding the following import. (You may need to adjust the relative path depending on where your new file is in the file system).
```
import { DebugService } from './../_services/debug.service';
```
Once you have added the service, add a `private` variable to the constructor. ex: `private debug: DebugService`. Then in the `ngOnInit()` you can call the `log` function like this:
```
this.debug.log('{{identifier}}', '{{message}}');
```
Where `design-component` is the identifier you would like to use to know which component is creating the log, and `message` is the message you would like to have logged. This is helpful when you wish you filter which log messages appear in your console log.

Example call to the `log()` function of the `DebugService`
```
this.debug.log('design-component', 'we made it a service now!');
```

Debug uses [printf-style](https://wikipedia.org/wiki/Printf_format_string) formatting. Below are the officially supported formatters:

| Formatter | Representation |
|-----------|----------------|
| `%O`      | Pretty-print an Object on multiple lines. |
| `%o`      | Pretty-print an Object all on a single line. |
| `%s`      | String. |
| `%d`      | Number (both integer and float). |
| `%j`      | JSON. Replaced with the string '[Circular]' if the argument contains circular references. |
| `%%`      | Single percent sign ('%'). This does not consume an argument. |

_*NOTE:*_ The service will prepend `ceilings:` to all the identifiers. This is done so that if you wish to see all the log message for the ceilings app you can do that by setting the localStorage variable `debug` to `ceilings:*` like this:
```
localStorage.debug = 'ceilings:*'
```

You can change what logs appear simply by changing the value of the `debug` variable in your localStorage. You can separate multiple rules with the comma `,`.

For more information on what the `Debug` library can do. Look at their [Github Page](https://github.com/visionmedia/debug)

## Versioning
We use [grunt-bump](https://github.com/vojtajina/grunt-bump) to manage our versions. We are using very basic settings, found in the `Gruntfile.js`. To bump the version you just need to run:
```
grunt bump
```
This will bump the `patch` by 1. So if the version is `0.0.1` and we run the command above then the version will become `0.0.2`.

The current settings will push the version bump commit into the `origin` so that we don't push code to our live code without using a pull request. The process is to move the code live via a pull request and then after that you can run `git push upstream v0.0.2` **remember to push the correct tag name (version)**

## AccountingJS


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
