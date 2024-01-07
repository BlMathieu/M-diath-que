<?php

require_once "../Model/ModelLivre.php";

$action = $_GET["action"] ?? "read";
$actions = get_class_methods("ControlleurLivre");
if (in_array($action, $actions))
    ControlleurLivre::$action();

class ControlleurLivre
{

    static function readAll()
    {
        $livres = ModelLivre::selectAll();
        echo json_encode($livres);
    }

    static function read(){

        $idlivre = $_GET['idlivre'];

        $livre = ModelLivre::select($idlivre);
        echo(json_encode($livre));
    }

    static function create()
    {
        $livre = [
            "titreLivre" => $_POST["titre"]
        ];
        $id = ModelLivre::save($livre);
        echo json_encode($id);
    }

    static function delete()
    {
        $id = $_GET["id"];
        ModelLivre::delete($id);
    }

    static function getLivreNonEmprunt(){
        $livres = ModelLivre::getLivreNonEmprunt();
        echo json_encode($livres);
    }

    static function getTitres(){
        $idAdherent = $_GET['idAdherent'];
        $livres = ModelLivre::getTitres($idAdherent);
        echo json_encode($livres);
    }
}