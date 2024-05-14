import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import axios from 'axios'
import env from '#start/env'

export const getEmail = async (
  fileName: string,
  replaceContent: { [key: string]: string }[] = []
): Promise<{ content: string } | { error: string }> => {
  // Configuration
  const credentials = {
    accessKeyId: env.get('TEBI_EMAIL_KEY'),
    secretAccessKey: env.get('TEBI_EMAIL_SECRET'),
  }

  const bucketName = 'aspemails'

  // Créer un client S3
  const s3Client = new S3Client({
    endpoint: 'https://s3.tebi.io',
    credentials: credentials,
    region: 'global',
  })

  // Créer la commande pour obtenir l'objet
  const getObjectCommand = new GetObjectCommand({
    Bucket: bucketName,
    Key: fileName,
  })

  // Générer une URL signée pour l'objet
  const signedUrl = await getSignedUrl(s3Client, getObjectCommand, {
    expiresIn: 3600,
  })

  try {
    const response = await axios.get(signedUrl)
    // Remplacer les occurrences de {{key}} par la valeur correspondante
    let modifiedContent = response.data
    if (replaceContent) {
      replaceContent.forEach((replacePair) => {
        const regex = new RegExp(`{{${replacePair.key}}}`, 'g')
        modifiedContent = modifiedContent.replace(regex, replacePair.value)
      })
    }

    return { content: modifiedContent }
  } catch (error: any) {
    return {
      error: `Erreur serveur lors de la récupération du mail: ${error.message}`,
    }
  }
}
