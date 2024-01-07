<?php

require_once "Model.php";

class ModelEmprunt extends Model {

    public static $pdo;
    public static $object = "emprunt";
    public static $primary = "idLivre";

    public static function getEmprunts(){
        try{

            $pdo = static::$pdo;

            $sql = "SELECT t.idLivre,l.titreLivre,a.nomAdherent from emprunt t
                    JOIN livre l ON l.idLivre=t.idLivre
                    JOIN adherent a ON a.idadherent = t.idAdherent";

            $req = Model::$pdo->query($sql);
            $tab_results = $req->fetchAll();

            if (empty($tab_results)){return false;}
            return $tab_results;
        }
        catch (PDOException $e) {
            echo $e->getMessage(); // affiche un message d'erreur
            die();
        }
    }

    public static function rendreEmprunt($adherent,$livre){
        try{
            $sql = "DELETE FROM emprunt WHERE idAdherent=:primary AND idLivre=:secondary";

            $req_prep = Model::$pdo->prepare($sql);

            $values = array(
                "primary" => $adherent,
                "secondary"=> $livre,
            );
            // On donne les valeurs et on exécute la requête
            $req_prep->execute($values);
        }
        catch(PDOException $e){
            echo $e->getMessage();
            die();
        }

    }
}