# attentive-swagger

Test

This project renders the Attentive Open API Spec in Swagger UI and runs on top of a Node proxy server.

## Instructions

- [View the Attentive OpenAPI Spec](https://attentive-api-swagger.herokuapp.com/)
- Click the Authorize button on the top right and enter your Attentive `API Key`
- Run some API requests

## Requirements

- Attentive Account
- Attentive API Key

## Resources

- [Attentive Developer Docs](https://docs.attentivemobile.com/)
- [Attentive Open API Spec](https://docs.attentivemobile.com/openapi/reference/overview/)

## How it works

If Swagger attempted to send the API requests directly from the browser to the Attentive API Server, the requests would be blocked due to CORS restritioncs. To solve this, Swagger sends the requests to a Node Express proxy server that reroutes messages to the Attentive API Server.

- The Sagger UI static HTML/JS/CSS files and the Attentive OpenAPI Spec (`attentive.json`) are stored in the root `/public` folder. These files are rendered in the browser when visiting the root directory.
- When a user interacts with the Swagger doc, the API requests are sent to the proxy server running at its root.
- The proxy server reroutes the requests to the Attentive API server (`https://api.attentivemobile.com/v1/...`) and returns the responses to Swagger

## How to run the dev server locally or deploy to heroku

- Clone the [repo](https://github.com/attentive-sales-engineering/attentive-swagger-proxy) via: `gh repo clone attentive-sales-engineering/attentive-swagger-proxy`
- From the root directory, run `npm install` to install dependencies
- Run `npm start` to run locally on http://localhost:3000
- Deploy to heroku via `git push heroku main`
