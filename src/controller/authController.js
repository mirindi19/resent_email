import Models from "../db/models"
const {users} = Models;
import bcrypt from "bcrypt";
import {v4 as uuidv4 } from 'uuid';
import {encode, decode} from "../helper/jwtTokenize"
import nodemailer from "nodemailer";
import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
class authController{
    static async signup(req, res){
        try {
            const {Fullname, email,password}=req.body;
            const Myuuid =uuidv4();
            const hash = await bcrypt.hashSync(password, 10);
            const checkUser = await users.findOne({
                where:{email:email}
            });
            if(checkUser){
                return res.status(400).json({
                    status:400,
                    message:"Email already exist"
                    
                })
            }
            else{
                const createDate = await users.create({
                    id:  Myuuid,
                    Fullname,
                    email,
                    role:"user",
                    password: hash,         
                });
                res.status(200).json({
                    status: 200,
                    message: "Account created",
                    data:createDate
                })

            }
        } catch (error) {
            res.status(500).json({
                status:500,
                message:"server problem:" + error.message
            })
            
        }
    }

    static async Login(req, res){
        try {
            const {email,password}=req.body
            const findUser = await users.findOne({
                where: {email:email}
            })
            if(!req.user){
                res.status(404).json({
                    status: 404,
                    message:"Account don't exit"
                })
            }
            else{
                const dbEmail = req.user.email
                const dbPassword = req.user.password
                const dbRole= req.user.role
                const dborganisationId=req.user.organizationId
                const decreptedPassword = await bcrypt.compare(password, dbPassword)
                console.log(dbEmail,decreptedPassword);

                if(dbEmail == email){
                    if(decreptedPassword){
                        const token=await encode({
                            email,
                            dbRole,
                            dborganisationId
                            
                        });

                        const decodeToken = await decode(token);
                        const role = decodeToken.dbRole
                        const emailfromtoken =decodeToken.email
                        console.log(role,emailfromtoken);
                       return res.status(200).json({
                            stastus: 200,
                            message: "Login succefull",
                            data:{
                                role,
                                emailfromtoken,
                                token
                            }
                        })
                    }else{
                        res.status(400).json({
                            stastus: 400,
                            message:"Wrong Password"
                        })
                    }
                }else{
                    res.status(400).json({
                        stastus: 400,
                        message:"Wrong Email"
                    })
                }
            }
            
        } catch (error) {
            res.status(500).json({
                stastus: 500,
                message:"server problem" +error.message
            })
        }
    }
    static async forgotPassword(req, res) {
        const { email } = req.body;
        try {
          if (!req.user) {
            return res.status(400).json({
              status: 400,
              message: "User with email does not exist!",
            });
          }
          const user = await users.findOne({ email: email });
          const token = jwt.sign(
            { _id: user._id, email },
            process.env.RESET_PASSWORD_KEY,
            { expiresIn: "15m" }
          );
    
          await users.update({ resetlink: token }, { where: { email: email } });
    
          const mail = nodemailer.createTransport({
            host: "smtp.outlook.com",
            port: 587,
            secure: false,
            auth: {
              user: "mirindisaidi19@outlook.com", // Your email id
              pass: "kylexy97", // Your password
            },
          });
    
          const data = await mail.sendMail({
            from: "mirindisaidi19@outlook.com",
            to: email,
            subject: "REB-QualityEducation Activation Email.",
            text: `
              Hello,
              Please copy and past the address bellow too reset your password.
              http://${process.env.CLIENT_URL}/auth/rest-password/${token}
              `,
            html: `
              <h1>Hello ${req.user.Fullname},</h1>
              <p>Reset your password.</p>
              <p>Please click the link below to reset your password.</p>
            
              `,
          });
          try {
            data.sendMail(data, function (error, body) {
              if (error) {
                console.log(error);
              } else {
                console.log("Email sent successful");
              }
            });
          } catch (error) {
            console.log("something went wrong ");
          }
          return res.status(200).json({
            status: 200,
            message: "Message  sent successfully!",
          });
        } catch (error) {
          return res.status(500).json({
            status: 500,
            message: error.message,
          });
        }
      }
}

export default authController