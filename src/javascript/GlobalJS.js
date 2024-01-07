let requetes;
let livre;
let adherent;
let listeEmprunt;
let boutonAjoutLivre;
let boutonAjoutAdherent;
let sectionNouveauAdherent
let sectionNouveauLivre;

    /** Initialise la div adhérent **/
    function initAdherent(){
        clearBalise(adherent);

        let reponse = requetes.getAllAdherentEmprunt();
        reponse.then((value)=>{
            let tab = value;

            for(let i =0;i<tab.length;i++){
                let div = document.createElement('div');
                let elem = document.createElement('p');

                elem.onclick = function (){
                    let text ="";
                    if(tab[i].nbLivre>0){
                        let titres = requetes.getTitres(tab[i].idAdherent);
                        titres.then((valueTitre)=>{
                            let titre = valueTitre;
                            for(let x=0;x<titre.length;x++){
                                text += " |"+titre[x].titreLivre+"|";
                            }
                            confirm(""+tab[i].nomAdherent+" a emprunté :"+text);
                        })
                    }
                }

                if(tab[i].nbLivre>0){
                    console.log(tab[i].nbLivre);
                    if(tab[i].nbLivre==1){
                        elem.textContent = tab[i].idAdherent + "-" +  tab[i].nomAdherent + " ("+ tab[i].nbLivre + " emprunt)";
                    }
                    else{
                        elem.textContent = tab[i].idAdherent + "-" +  tab[i].nomAdherent + " ("+ tab[i].nbLivre + " emprunts)";
                    }
                }
                else{
                    elem.textContent = tab[i].idAdherent + "-" +  tab[i].nomAdherent;
                }

                adherent.appendChild(div);
                div.appendChild(elem);
                ajoutBaliseSurpression(div,'Adherent',tab[i].idAdherent);
            }
        })
    }

    /** Initialise la div Emprunt **/
     function initEmprunt(){
        clearBalise(listeEmprunt);
        let reponse = requetes.getEmprunts();
        reponse.then((value)=>{
            let tab = value;
            for(let i=0;i<tab.length;i++){
                let div = document.createElement('div');
                let elem = document.createElement('p');
                elem.textContent = tab[i].idLivre +"-"+tab[i].titreLivre;
                elem.onclick = function (){
                    let res = confirm("Rendre le livre ?");
                    if(res){
                        requetes.supprimerID(tab[i].idLivre,"Emprunt",initAll);
                    }
                }

                listeEmprunt.appendChild(div);
                div.appendChild(elem);
                div.appendChild(ajoutBaliseLivre(tab[i].titreLivre));
                div.appendChild(ajoutBaliseAdherent(tab[i].titreLivre,tab[i].nomAdherent));
                ajoutBaliseSurpression(div,'Emprunt',tab[i].idLivre);
            }
        })
    }

     function initOnClickBt(){
        boutonAjoutAdherent.onclick = function (){
            requetes.ajouterAdherent(sectionNouveauAdherent.value,initAdherent);
        }

        boutonAjoutLivre.onclick = function (){
            requetes.ajouterLivre(sectionNouveauLivre.value,initLivre);
        }
    }

    /** Initialise la DIV livre **/
     function initLivre(){
        clearBalise(livre);
        let reponse = requetes.fetchGetLivreNonEmprunt();
        reponse.then((value)=>{
            let tabDataLivre = value;
            for(let i =0;i<tabDataLivre.length;i++) {
               let div = document.createElement('div');
               let elem = document.createElement('p');
               elem.textContent = tabDataLivre[i].idLivre + "-" + tabDataLivre[i].titreLivre;
               elem.onclick = function () {
                    let res = prompt("Entrer l'id d'un adhérent pour emprunter le livre :");
                    if(res!=null){
                        requetes.ajouterEmprunt(res, tabDataLivre[i].idLivre,initAdherent,initEmprunt,initLivre);
                    }
                }
                livre.appendChild(div);
                div.appendChild(elem);
                div.appendChild(ajoutBaliseLivre(tabDataLivre[i].titreLivre));
                ajoutBaliseSurpression(div, 'Livre', tabDataLivre[i].idLivre);
            }
        })
    }

    /** Nettoie le contenu d'une balie HTML **/
     function clearBalise(balise){
         let length = balise.childNodes.length
        for(let i=0;i<length;i++){
            balise.firstChild.remove();
        }
    }

    /** Ajoute une balise IMG contenant l'image X et défini son comportement en cas de clic **/
     function ajoutBaliseSurpression(balise,controller,id){
        let x = document.createElement('img');
        x.alt='delete';
        x.src='img/x.svg';
        x.onclick = function (){
            requetes.supprimerID(id,controller,initAll);
        }
        balise.appendChild(x);
    }

     function ajoutBaliseLivre(titreLivre) {
         let l = document.createElement('img');
         l.alt = 'livreEmprunt';
         l.src = "img/image.svg";
         l.classList.add("livreIco");

         l.onclick = function(){ajouterImageLivre(titreLivre,0);}
         return l;
     }

     /** Ajoute les images des livres correspondant dans un popup **/
     function ajouterImageLivre(titreLivre,i){
         let reponse = requetes.requeteAPIBooks(titreLivre);

             reponse.then((value)=>{
                 try{
                     let url = value.items[i].volumeInfo.imageLinks.smallThumbnail;
                     document.getElementById('imgPopUp').src=url;
                     document.getElementById('popUp').style.visibility='visible';


                 }
                 catch (error){
                     console.log(error);
                     ajouterImageLivre(titreLivre,i+1);
                 }
             })
     }

     function ajoutBaliseAdherent(titreLivre,nomAdherent){
         let a = document.createElement('img');
         a.alt="adherent";
         a.src="img/person.svg";
         a.onclick = function (){
             alert("Le livre '"+titreLivre+"' a été emprunté par '"+nomAdherent+"'");
         }
         return a;
     }

     function initAll(){
         initAdherent();
         initEmprunt();
         initLivre();
     }

window.onload = function () {
    /** Renvoi aux divs du HTML **/
    requetes = new Requetes();
    livre = document.getElementById('listeLivresDisponibles');
    adherent = document.getElementById('listeAdherents');
    listeEmprunt = document.getElementById('listeLivresEmpruntes');
    boutonAjoutLivre = document.getElementById('ajouterLivre');
    boutonAjoutAdherent = document.getElementById('ajouterAdherent');
    sectionNouveauAdherent = document.getElementById('nomAdherent');
    sectionNouveauLivre = document.getElementById('titreLivre');
    document.getElementById('imgX').onclick = function (){document.getElementById('popUp').style.visibility='hidden';}
    initOnClickBt();
    initAdherent();
    initLivre();
    initEmprunt();
}



// FONCTIONNE PAS
/*async function getEmprunts(idAdherent){
    let url = "php/Controller/ControllerEmprunt.php?action=getEmprunts";
    let reponse;
     await fetch(url, {
         method: 'POST',
         headers: {
             'Content-Type': 'application/x-www-form-urlencoded'
         },
         body: JSON.stringify({
             idAdherent: encodeURIComponent(idAdherent)
         })
     })
         .then(data => console.log(data.json()))
         .catch(error => console.error(error));
}*/















