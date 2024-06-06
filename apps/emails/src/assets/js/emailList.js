export const emailList = [
  {
    name: "Inscription",
    subject: "Bienvenue sur ASP !",
    template: "inscription",
  },
  {
    name: "Mot de passe oublié",
    subject: "Lien réinitialisation de votre mot de passe",
    template: "mot-de-passe-oublie",
  },
];

export function createEmailTable(emails) {
  // Création de l'en-tête de la table
  let tableHTML = `<table>
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Sujet</th>
                            <th>Template</th>
                        </tr>
                    </thead>
                    <tbody>`;

  // Ajout des lignes de données pour chaque e-mail
  emails.forEach((email) => {
    tableHTML += `<tr>
                    <td><a href="http://localhost:3010/${email.template}.html">${email.name}.html</a></td>
                    <td>${email.subject}</td>
                    <td>${email.template}</td>
                  </tr>`;
  });

  // Fermeture de la table
  tableHTML += `</tbody>
            </table>`;

  return tableHTML;
}
