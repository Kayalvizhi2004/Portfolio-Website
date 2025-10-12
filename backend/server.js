import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// POST route to send email
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // configure transporter (using Gmail as example)
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "nkayalvizhi2004@gmail.com", // replace with your Gmail
        pass: "djofkpeajmibcohx",   // use Gmail App Password (not your login password)
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${email}>`,
      to: "nkayalvizhi2004@gmail.com",
      subject: "New Message from Portfolio Contact Form",
      html: `
        <h3>New Contact Request</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json({ success: false, error: "Failed to send email" });
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
