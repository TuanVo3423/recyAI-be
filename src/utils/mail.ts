// hàm send mail
import Mailgen from 'mailgen'
import nodemailer from 'nodemailer'
const config = {
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
}
const email = {
  body: {
    name: 'John Appleseed',
    intro: "Welcome to Mailgen! We're very excited to have you on board.",
    action: {
      instructions: 'To get started with Mailgen, please click here:',
      button: {
        color: '#22BC66', // Optional action button color
        text: 'Confirm your account',
        link: 'https://www.youtube.com/watch?v=wTlsP_I6tGk&list=PLk8gdrb2DmChrL50moKeFNAVnFqZ3GLF7&index=9'
      }
    },
    outro: "Need help, or have questions? Just reply to this email, we'd love to help."
  }
}

export type TSetEmailBody = {
  instructions: string
  name?: string
  button_content: string
  link: string
}
export const setEmailBody = ({ name, instructions, button_content, link }: TSetEmailBody) => {
  const emailBody = {
    body: {
      name: name,
      intro: "Welcome to RecyAI! We're very excited to have you on board.",
      action: {
        instructions: instructions,
        button: {
          color: '#22BC66', // Optional action button color
          text: button_content,
          link: link
        }
      },
      outro: "Need help, or have questions? Just reply to this email, we'd love to help."
    }
  }
  return emailBody
}

export type TMailSender = {
  name: string
  sendTo: string
  subject: string
  button_content: string
  link: string
  instructions: string
}
export const sendMail = async ({ sendTo, subject, name, button_content, link, instructions }: TMailSender) => {
  const tranporter = nodemailer.createTransport(config)
  const MailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'Recylcing AI System',
      link: `${process.env.BASE_API_FE_URL}`
    }
  })
  const emailBody = MailGenerator.generate(setEmailBody({ name, button_content, link, instructions }))

  const message = {
    from: process.env.EMAIL,
    to: sendTo,
    subject: subject,
    html: emailBody
  }
  return new Promise<string>((resolve, reject) => {
    tranporter
      .sendMail(message)
      .then(() => {
        resolve('Send mail success')
      })
      .catch((error) => {
        throw reject(error)
      })
  })
}
