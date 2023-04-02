import app from"../server";
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import Models from "../db/models";
const {products} =Models;
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

  describe('search product', function (){
    // let id;
    // before(async function () {
    //   sequelize.sync();
    //   const testProduct = {
    //     name:'TestProductName',
    //     description:'DescriptionTest',
    //     quantity:"2",
    //     price:200,
    //     category:'Phone',
        
    //   };
    //   const product = await products.create(testProduct);
    //   id = product.id;
    // });
    // after(async function () {
    //   const product = await products.findOne({ where: { name: 'TestProductName' } });
    //   await products.destroy({ where: { id: product.dataValues.id } });
    // });
    it('should return the search list', async function () {
        const res = await chai
          .request(app)
          .get('/product/search?maxPrice=5000000')
          .send();
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message');
      });
      it('should not return the search list', async function () {
        const res = await chai
          .request(app)
          .get('/product/search?key=pkzay')
          .send();
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('message');
      });


  })
