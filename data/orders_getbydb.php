<?php
/**
*��;��ΪmyOrders.html��ҳ���ض�����¼
*���ݸ�ʽ��JSON��ʽ�����磺
*  [
*      {"userName":'����','gender':'�Ա�',"did":"���Ų�",order_time:�µ�ʱ��,addr:"��ַ",phone:'�绰����'},
*      {...},
*      {...}
*   ]
*����ʱ�䣺  2016-03-14 10:10:25
*����޸�ʱ�䣺2016-03-15 20:10:33
**/
header('Content-Type: application/json; charset=UTF-8');
$output = [];

include('config.php');
$conn = mysqli_connect($db_host, $db_user, $db_pwd, $db_name, $db_port);
$sql = "SET NAMES UTF8";
mysqli_query($conn, $sql);
$sql = "SELECT * FROM kf_order LEFT JOIN kf_dish using(did)";

$result = mysqli_query($conn, $sql);
while( ($row=mysqli_fetch_assoc($result))!==NULL ){
    $output[] = $row;
};

echo json_encode($output);
?>