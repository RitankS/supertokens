import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session/index.js";
import ThirdParty from "supertokens-node/recipe/thirdparty/index.js";
import express from "express";
import cors from "cors";
import { middleware } from "supertokens-node/framework/express/index.js";
import Passwordless from "supertokens-node/recipe/passwordless/index.js";
import { errorHandler } from "supertokens-node/framework/express/index.js";



supertokens.init({
    framework: "express",
    supertokens: {
        
        connectionURI: "http://localhost:3567",
        
    },
    appInfo: {
        // learn more about this on https://supertokens.com/docs/session/appinfo
        appName: "audyt",
        apiDomain: "http://localhost:8008",
        websiteDomain: "http://localhost:3000",
        apiBasePath: "/auth",
        websiteBasePath: "/"
    },
    clientType: "web-and-android",
    recipeList: [
        ThirdParty.init({
            signInAndUpFeature: {
                // We have provided you with development keys which you can use for testing.
                // IMPORTANT: Please replace them with your own OAuth keys for production use.
                //mention your own client id and client secret 
                providers: [{
                    config: {
                        thirdPartyId: "google",
                        clients: [{
                            clientId: "",
                            clientSecret: ""
                        }]
                    },
                    config: {
                        thirdPartyId: "github",
                        clients: [{
                            clientId: "",
                            clientSecret: ""
                        }]
                    },
                    config: {
                        thirdPartyId: "Microsoft",
                        clients: [{
                            clientId: "",
                            clientSecret: ""
                        }]
                    },

                    
                    
                    
                }],
                
            }
        }),


        Passwordless.init({
            flowType: "USER_INPUT_CODE",
            contactMethod: "EMAIL"
        }),
        Session.init() // initializes session features
    ]
});



let app = express();
const port = process.env.PORT || 8008;


app.get('/', (req, res) => {
    res.send('Hello, this is your nodemon server with ES6 imports!');
});


app.post('/data-import', (req, res) => {


})



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


app.use(cors({
    origin: "http://localhost:3000",
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
}));


// IMPORTANT: CORS should be before the below line.
app.use(middleware());


// IMPORTANT: CORS should be before the below line.
app.use(errorHandler())