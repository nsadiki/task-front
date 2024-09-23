import React, { useEffect } from 'react';
// Corrige l'importation
import { jwtDecode }from 'jwt-decode';

function TokenHandler() {

  useEffect(() => {

    const token = sessionStorage.getItem('jwtToken');
    console.log("le token dznas le token handler : ", token);

    if (token) {
      try {
        // Décode le token
        const decodedToken = jwtDecode(token);
        console.log("Le token décodé ressemble à ça :", decodedToken);

        // Stocke l'userId du token dans sessionStorage
        sessionStorage.setItem('userId', decodedToken.userId);

        // Vérifie si le token est expiré (optionnel)
        if (decodedToken.exp * 1000 < Date.now()) {
          console.log("Le token a expiré.");
          sessionStorage.removeItem('jwtToken');
          // Redirection ou autres actions possibles ici
        }

      } catch (error) {
        console.log("Erreur lors du décodage du token :", error);
      }
    }

  }, []);

  return null;
}

export default TokenHandler;
