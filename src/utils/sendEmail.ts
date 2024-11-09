import nodemailer from 'nodemailer'
import fs from 'fs'
import path from 'path'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'spacescribe.info@gmail.com',
    pass: process.env.PASS,
  },
})

/**
 * Sends an email to the provided address.
 * @param to The address to send the email to.
 * @returns A Promise that resolves when the email has been sent.
 */
export const sendEmail = async (to: string): Promise<void> => {
  try {
    const projectRoot = process.cwd()
    const templatePath = path.join(
      projectRoot,
      'src',
      'templates',
      'subscriptionEmailTemplate.html'
    )

    const htmlContent = await fs.promises.readFile(templatePath, 'utf-8')
    const mailOptions = {
      from: 'spacescribe.info@gmail.com',
      to,
      subject: 'Welcome to SpaceScribe!',
      html: htmlContent,
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('Message sent: %s', info.messageId)
  } catch (error) {
    console.error('Error sending email:', error)
    throw error
  }
}
