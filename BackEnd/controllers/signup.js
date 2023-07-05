import "dotenv/config";
import nodemailer from "nodemailer";
import { getUsers, userExists } from "../services/userService.js";
import User from "../model/user.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import jsonwebtoken from "jsonwebtoken";
import { SignUpValidator } from "../validation/signUpValidation.js";

const jwtSecret = process.env.JWT_SECRET;

export const Signup = async (req, res) => {
  try {
    const { error } = SignUpValidator(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { firstName, lastName, email } = req.body;
    const length = 10;
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters.charAt(randomIndex);
    }
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.SENDER_EMAIL_ADDRESS,
        pass: process.env.SENDER_EMAIL_PASSWORD,
      },
    });
    const sendWelcomeEmail = (userEmail, password) => {
      const mailOptions = {
        from: process.env.SENDER_EMAIL_ADDRESS,
        to: userEmail,
        subject: "Welcome to Cars Application",
        html: `
              <p>Dear ${firstName},</p>
              <p>Welcome to Cars App! We are excited to have you on board.</p>
              <p>Welcome! Your temporary password is: <strong> ${password} </strong></p>
              <p>If you have any questions or need assistance, feel free to reach out to us at cars@gmail.com.</p>
              <p>Thank you for choosing Cars Application!</p>
              <p>Best Regards,</p>
              <p>Car App Team</p>
              <p>Click on the following link to move to login page : http://localhost:3000/</p>
    `,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
        } else {
          console.log("Email sent:", info.response);
        }
      });
    };
    const users = await getUsers();

    if (!(firstName, lastName, email)) {
      return " Must provide all fields ";
    }
    if (!users) return "No users found in db";
    const encryptedPassword = await bcrypt.hash(password, 10);
    const oldUser = await userExists({ email: email.toLowerCase() });
    if (oldUser) {
      return res.status(500).json({message: "User Already Exist. Please Login"});
    }
    const user = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });
    if (user) {
      sendWelcomeEmail(email, password);
    }
    res.status(200).send({
      message: "User created Successfully",
    });
  } catch (err) {
    console.log("err, ", err);
    res.status(500).json(err);
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!(email, password)) {
      res.status(400).send("All inputs are required");
    }
    const user = await userExists({ email: email.toLowerCase() });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jsonwebtoken.sign({ user_id: user._id, email }, jwtSecret, {
        expiresIn: "2h",
      });
      user.token = token;
      const data = {
        id: user._id,
        token,
        email,
        firstName: user.firstName,
        lastName: user.lastName,
      };

      return res.status(200).json(data);
    }
    return res.status(400).send("Invalid Credentials");
  } catch (err) {
    res.status(500).json(err);
  }
};
