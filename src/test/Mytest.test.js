import app from"../server";
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
chai.should();
chai.use(chaiHttp);

describe("PUT /auth/forgot-password",()=>{
    it("Forget password and reset it",(done)=>{
        chai.request(app)
        .put("/auth/forgot-password")
        .send({  email: "mirindisaidi19@gmail.com" })
        .end((err,response)=>{
            const RESET_PASSWORD_TOKEN =response.body.token
            chai.request(app)
            .put("/auth/reset-password/"+ RESET_PASSWORD_TOKEN)
            .send({  password: "Koonew@3" })
            .end((err,response)=>{
                response.should.have.status(200);
            done()

        })
    })
    })
  });
  describe("PUT /auth/forgot-password",()=>{
    it("User with email does not exist!",(done)=>{
        chai.request(app)
        .put("/auth/forgot-password")
        .send({  email: "mirindisai9@gmail.com" })
        .end((err,response)=>{
            response.should.have.status(400);
            done()
        })
    })
  });
