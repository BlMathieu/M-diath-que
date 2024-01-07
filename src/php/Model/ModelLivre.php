<?php

require_once "Model.php";
require_once "ModelAdherent.php";
require_once "ModelEmprunt.php";

class ModelLivre extends Model {
    static $object = "livre";
    static $primary = "idLivre";


    public static function getTitres($idAdherent){
        try{
            $pdo = static::$pdo;
            $sql = "SELECT titreLivre FROM livre l 
                    JOIN emprunt t ON t.idLivre=l.idLivre
                    JOIN adherent a ON a.idAdherent=t.idAdherent
                    WHERE a.idAdherent = :primary;)";
            $req_prep = Model::$pdo->prepare($sql);
            $values = array(
                "primary" => $idAdherent
            );
            $req_prep->execute($values);
            $req_prep->setFetchMode(PDO::FETCH_CLASS, 'ModelEmprunt');
            $tab_results = $req_prep->fetchAll();

            if (empty($tab_results)){return false;}
            return $tab_results;
        }
        catch (PDOException $e) {
            echo $e->getMessage(); // affiche un message d'erreur
            die();
        }
    }
    public static function getLivreNonEmprunt(){
        try{
            $pdo = static::$pdo;
            $sql = "SELECT idLivre,titreLivre FROM livre WHERE idLivre NOT IN(SELECT idlivre FROM emprunt)";
            $req = Model::$pdo->query($sql);
            // On donne les valeurs et on exécute la requête
            $req->setFetchMode(PDO::FETCH_CLASS, 'ModelEmprunt');
            $tab_results = $req->fetchAll();
            if (empty($tab_results)){return false;}
            return $tab_results;
        }
        catch (PDOException $e) {
            echo $e->getMessage(); // affiche un message d'erreur
            die();
        }
    }
}