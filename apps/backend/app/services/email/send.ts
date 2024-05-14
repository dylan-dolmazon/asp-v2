import { getEmail } from '#services/email/get'
import env from '#start/env'
import mail from '@adonisjs/mail/services/main'

export const sendEmail = async (
  fileName: string,
  object: string,
  to: string[],
  replaceContent: { [key: string]: string }[] = []
): Promise<boolean> => {
  replaceContent.push(
    {
      key: 'email_title',
      value: object,
    },
    {
      key: 'contact_email',
      value: env.get('SMTP_EMAIL'),
    }
  )

  const response = await getEmail(`${fileName}.html`, replaceContent)

  if ('error' in response) {
    return false
  }

  await mail.send((message) => {
    message.to(to.join(', ')).subject(object).html(response.content)
  })

  return true
}
