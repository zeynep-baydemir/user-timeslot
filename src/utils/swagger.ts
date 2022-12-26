import { Express, Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import {version} from "../../package.json";
import log from "./logger";

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info:{
            title: 'Timeslot API Docs',
            version
        },
        components:{
            securitySchemas:{
                bearerAuth:{
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",   
                },
            },
        },
        security:[
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["../routes/*.routes.ts", "../schema/*.schema.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export function swaggerDocs(app: Express, port: number){
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    app.get('docs.json', (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

    log.info(`Docs available at http://localhost:${port}/docs`);
}