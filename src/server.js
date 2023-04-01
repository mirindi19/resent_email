import express from "express";
import cors from "cors";
import routers from "./routers";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express"
require('dotenv').config();
const app = express();


const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "E-commerce",
        version: "0.1.0",
        description:
          "E-commerce Swagger",
        contact: {
          name: "Mirindi saidi",
          url: "My Brand",
          email: "mirindisaidi19@gmail.com",
        },
      },
      servers: [
        {
          url: "http://localhost:4000",
        },
      ],
    },
    apis: ["./src/routers/auth.routers.js","./src/routers/product.routers.js"],
  };
  
  const specs = swaggerJsdoc(options);
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
  );





app.use(express.json());
app.use(cors());
app.use(routers);

const port =process.env.PORT || 5000;
app.listen(port, ()=> {
    console.log(`http://localhost:${port}`)
});

export default app;