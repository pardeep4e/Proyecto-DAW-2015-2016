<?php
 header('Content-Type: application/json');
/*
 * Escribe el archivo json
 */
//cambio de nivel de mapa
function JSonWrite($obj){
  $map = (int)$obj;
  $file = file_get_contents('lvl.json');
  $fDecode = json_decode($file,true);
  $fDecode['ID']++;
  $json = json_encode($fDecode);
  file_put_contents('lvl.json',$json);
}
//se suman los puntos
function JSonWritePOINT($obj){
  $point = (int)$obj;
  $file = file_get_contents('lvl.json');
  $fDecode = json_decode($file,true);
  $fDecode['PO'] = $point;
  $json = json_encode($fDecode);
  file_put_contents('lvl.json',$json);
}
//resetear el contador de puntos
function JSonWritePOINTReset($obj){
  $file = file_get_contents('lvl.json');
  $fDecode = json_decode($file,true);
  $fDecode['PO'] = 0;
  $fDecode['ID'] = 1;
  $json = json_encode($fDecode);
  file_put_contents('lvl.json',$json);
}

if($_POST['functionname'] == 'Write'){
    JSonWrite($_POST['arg']);
}
if($_POST['functionname'] == 'Point'){
    JSonWritePOINT($_POST['arg']);
}
if($_POST['functionname'] == 'Reset'){
    JSonWritePOINTReset($_POST['arg']);
}
