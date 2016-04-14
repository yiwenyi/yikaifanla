<?php
/**
*用途：为myOrders.html分页返回订单记录
*数据格式：JSON格式，形如：
*  [
*      {"userName":'婷婷','gender':'性别',"did":"几号菜",order_time:下单时间,addr:"地址",phone:'电话号码'},
*      {...},
*      {...}
*   ]
*创建时间：  2016-03-14 10:10:25
*最后修改时间：2016-03-15 20:10:33
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