class Requetes{
    /** Exécute une requête fetch qui récupère les adhérents **/
    async fetchAdherent(){
        let resultat;
        let url = 'php/Controller/ControllerAdherent.php?action=readAll';
        await fetch(url)
            .then((data =>  resultat=data.json()))
            .catch(function (error){console.log('erreur : '+error);})
        return resultat;
    }

    /**  Exécute une requête fetch qui donne une liste de tous les adhérent et de  **/
    async getAllAdherentEmprunt(){
        let resultat;
        let url = 'php/Controller/ControllerAdherent.php?action=getAllAdherentEmpruntLivre';
        await fetch(url)
            .then((data =>  resultat=data.json()))
            .catch(function (error){console.log('erreur : '+error);})
        return resultat;
    }

    /** Exécute une requête fetch qui récupère les livres empruntes **/
    async fetchEmprunt(){
        let resultat;
        let url = 'php/Controller/ControllerEmprunt.php?action=readAll';
        await fetch(url)
            .then((data => resultat=data.json()))
            .catch(function (error){console.log('erreur : '+error);})
        return resultat;
    }

    /**Exécute une requête fetch qui récupère la liste entière des livres **/
    async fetchLivre(){
        let resultat;
        let url = 'php/Controller/ControllerLivre.php?action=readAll';
        await fetch(url)
            .then((data => resultat = data.json()))
            .catch(function (error){console.log('erreur : '+error);})
        return resultat;
    }

    /** Récupère la liste des livres qui ne sont pas empruntés **/
    async fetchGetLivreNonEmprunt(){
        let resultat;
        let url = 'php/Controller/ControllerLivre.php?action=getLivreNonEmprunt';
        await fetch(url)
            .then((data => resultat = data.json()))
            .catch(function (error){console.log('erreur : '+error);})
        return resultat;
    }

    /** Récupère la globalité des livres **/
    async fetchLivre(){
        let resultat;
        let url = 'php/Controller/ControllerLivre.php?action=readAll';
        await fetch(url)
            .then((data => resultat = data.json()))
            .catch(function (error){console.log('erreur : '+error);})
        return resultat;
    }

    /** Retourne le titre d'un livre grâce à son ID **/
   async getTitres(idAdherent){
        let url = 'php/Controller/ControllerLivre.php?action=getTitres&idAdherent='+encodeURIComponent(idAdherent);
        let reponse;
     await fetch(url)
            .then((data => reponse = data.json()))
            .catch((error)=>console.log(error));
        return reponse;
    }

    /** Renvoie la liste des emprunts d'un Adhérent **/
   async getEmprunts(){
       let url = "php/Controller/ControllerEmprunt.php?action=getEmprunts";
       let reponse;
       await fetch(url)
            .then((data=>reponse=data.json()))
            .catch((error)=>console.log(error));
        return reponse;
    }

    /** Supprime un élément de la BD grâce à sa clé primaire (id) et son controller PHP **/
   async supprimerID(id,controller,initAll){
        let url = "php/Controller/Controller"+controller+".php?action=delete&id="+encodeURIComponent(id);
        await fetch(url)
            .then(function (){
                initAll();
            })
            .catch((error)=>{console.log(error)})
    }

    /*ajouterAdherent(adherent){ //OBSOLETE

        let xhr = new XMLHttpRequest();
        adherent = encodeURIComponent(adherent);
        let url = "php/Controller/ControllerAdherent.php?action=create";
        xhr.open("POST",url,false);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        let param = "nom="+adherent;
        xhr.send(param);
    }*/

    ajouterAdherent(adherent,initAdherent){
        let param = "nom="+encodeURIComponent(adherent);
        let url = "php/Controller/ControllerAdherent.php?action=create";
        fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: param // body data type must match "Content-Type" header
        }).then(function (){initAdherent()});
    }

    /** Ajoute un livre dans la table livre et met à jour la div Livre **/

    ajouterLivre(livre,initLivre){
        let param = "titre="+encodeURIComponent(livre);
        let url = "php/Controller/ControllerLivre.php?action=create";
        fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: param // body data type must match "Content-Type" header
        }).then(function (){initLivre()});

    }

   /* ajouterLivre(livre){

        let xhr = new XMLHttpRequest();
        livre = encodeURIComponent(livre);
        let url = "php/Controller/ControllerLivre.php?action=create";
        xhr.open("POST",url,true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        let param = "titre="+livre;
        xhr.send(param);

    }*/

    /** Ajout un nouvelle emprunt XHR EDITION **/
    /*function ajouterEmprunt(idadherent,idlivre){
        let url = "php/Controller/ControllerEmprunt.php?action=create";
        let xhr = new XMLHttpRequest();
        xhr.open("POST",url,false);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        let param = "idAdherent="+encodeURIComponent(idadherent)+"&idLivre="+encodeURIComponent(idlivre);
        xhr.send(param);
        console.log(xhr.responseText)
        console.log(param);
        fetchEmprunt();
        fetchAdherent();
    }*/
    /** Ajout un nouvelle emprunt et met à jour les divs FETCH EDITION **/
    async ajouterEmprunt(idadherent,idlivre,initAdherent,initEmprunt,initLivre){
        let param = "idAdherent="+encodeURIComponent(idadherent)+"&idLivre="+encodeURIComponent(idlivre);
        let url = "php/Controller/ControllerEmprunt.php?action=create";
        await fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: param // body data type must match "Content-Type" header
        }).then(function (){initAdherent(),initEmprunt(),initLivre()})
    }

    /** Supprime un élément de la table Emprunt via son idLivre et idEmprunt et met à jour les divs **/
    async rendreEmprunt(idadherent,idlivre,initAll){
        let param = "idAdherent="+encodeURIComponent(idadherent)+"&idLivre="+encodeURIComponent(idlivre);
        let url = "php/Controller/ControllerEmprunt.php?action=rendreEmprunt";
        await fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: param // body data type must match "Content-Type" header
        }).then(function (){initAll();});
    }
 /** récupère les données de l'api book via le titre d'un livre **/
    async requeteAPIBooks(titreDuLivre){
        let key = "AIzaSyCQQcbSwIRIUVo0nBp6tnvGebJT2g5ANS8";
        let titre = encodeURIComponent(titreDuLivre);
        let url = "https://www.googleapis.com/books/v1/volumes?key="+key+"&q="+titre;
        let reponse;
        await fetch(url)
          .then((value=>reponse=value.json()))
          .catch((error)=>{console.log(error)});
        return reponse;
     }
}