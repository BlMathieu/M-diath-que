<?php

require_once "Model.php";
require_once "ModelLivre.php";
require_once "ModelEmprunt.php";

class ModelAdherent extends Model {
    static $object = "adherent";
    static $primary = "idAdherent";

    public static function getAllAdherentEmpruntLivre(){
        try{
            $pdo = static::$pdo;
            $sql = "SELECT DISTINCT a.idAdherent,nomAdherent,titreLivre,COUNT(t.idLivre) AS nbLivre FROM adherent a
                    LEFT JOIN emprunt t ON t.idAdherent=a.idAdherent
                    LEFT JOIN livre l ON t.idLivre=l.idLivre
                    GROUP BY a.idAdherent";
            $req = Model::$pdo->query($sql);
            $req->setFetchMode(PDO::FETCH_CLASS, 'ModelEmprunt');
            $tab_results = $req->fetchAll();
            if (empty($tab_results)){return false;}
            return $tab_results;
        }
        catch (PDOException $e) {
            echo $e->getMessage();
            die();
        }
    }

}