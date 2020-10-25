<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
define('HOST', 'localhost:3307');
define('USER', 'root');
define('PASS', '');
define('DB', 'tugasku');

$conn = new mysqli(HOST, USER, PASS, DB) or die('Connetion error to the database');

if (isset($_GET['get'])) {
    switch ($_GET['get']) {
        case 'data':
            getData();
            break;

        case 'jenis':
            getJenis();
            break;

        case 'tingkat':
            getTingkat();
            break;

        case 'bahasa':
            getBahasa();
            break;

        default:
            defaultError();
            break;
    }
} else if (isset($_GET['post'])) {
    switch ($_GET['post']) {
        case 'data':
            postData();
            break;

        case 'jenis':
            postJenis();
            break;

        case 'bahasa':
            postBahasa();
            break;

        case 'tingkat':
            postTingkat();
            break;

        default:
            defaultError();
            break;
    }
} else if (isset($_GET['put'])) {
    switch ($_GET['put']) {
        case 'data':
            putData();
            break;

        case 'jenis':
            putJenis();
            break;

        case 'bahasa':
            putBahasa();
            break;

        case 'tingkat':
            putTingkat();
            break;

        default:
            defaultError();
            break;
    }
} else if (isset($_GET['delete'])) {
    switch ($_GET['delete']) {
        case 'data':
            deleteData();
            break;

        case 'jenis':
            deleteJenis();
            break;

        case 'bahasa':
            deleteBahasa();
            break;

        case 'tingkat':
            deleteTingkat();
            break;

        default:
            defaultError();
            break;
    }
}


// GET FUNCTION
// ============================================================
// Main Function
function getData()
{
    $data = [];
    if (isset($_GET['id']) && is_numeric($_GET['id'])) {
        $data['data']                  = getDataForDisplay('data.id_data', $_GET['id']);
        $data['dataReview']            = getDataForDisplayReview($data['data']);
        $data['dataTambah']['jenis']   = getMasterData('jenis');
        $data['dataTambah']['bahasa']  = getMasterData('bahasa');
        $data['dataTambah']['tingkat'] = getMasterData('tingkat');
    } else {
        $data['data']                  = getDataForDisplay();
        $data['dataReview']            = getDataForDisplayReview($data['data']);
        $data['dataTambah']['jenis']   = getMasterData('jenis');
        $data['dataTambah']['bahasa']  = getMasterData('bahasa');
        $data['dataTambah']['tingkat'] = getMasterData('tingkat');
    }
    responseResult($data, 200, true, "successfully retieved data");
}

function getJenis()
{
    if (isset($_GET['id']) && is_numeric($_GET['id'])) {
        $dataJumlah   = getDataForDisplay('data.id_jenis', $_GET['id']);
        $display      = getMasterData('jenis', $_GET['id']);
        $data['data'] = [
            'data' => $display,
            'jumlah'    => $dataJumlah,
            'review'    => getDataForDisplayReview($dataJumlah)
        ];
    } else {
        $data['data'] = getMasterDataJumlah('jenis', 'id_jenis');
    }
    responseResult($data, 200, true, "successfully retieved data");
}

function getBahasa()
{
    if (isset($_GET['id']) && is_numeric($_GET['id'])) {
        $dataJumlah   = getDataForDisplay('data.id_bahasa', $_GET['id']);
        $display      = getMasterData('bahasa', $_GET['id']);
        $data['data'] = [
            'data' => $display,
            'jumlah'    => $dataJumlah,
            'review'    => getDataForDisplayReview($dataJumlah)
        ];
    } else {
        $data['data'] = getMasterDataJumlah('bahasa', 'id_bahasa');
    }
    responseResult($data, 200, true, "successfully retieved data");
}

function getTingkat()
{
    if (isset($_GET['id']) && is_numeric($_GET['id'])) {
        $dataJumlah   = getDataForDisplay('data.id_tingkat', $_GET['id']);
        $display      = getMasterData('tingkat', $_GET['id']);
        $data['data'] = [
            'data' => $display,
            'jumlah'    => $dataJumlah,
            'review'    => getDataForDisplayReview($dataJumlah)
        ];
    } else {
        $data['data'] = getMasterDataJumlah('tingkat', 'id_tingkat');
    }
    responseResult($data, 200, true, "successfully retieved data");
}

// Tools function
function getDataForDisplay($collum = null, $id = null)
{
    global $conn;
    if ($id != null && $collum != null) {
        $collums = explode('.', $collum);
        $cl0 = $collums['0'];
        $cl1 = $collums['1'];
        $sql = "
				SELECT * 
				FROM `data`
				INNER JOIN `tingkat` ON `tingkat`.`id`= `data`.`id_tingkat`
				INNER JOIN `jenis` ON `jenis`.`id`  = `data`.`id_jenis`
				INNER JOIN `bahasa` ON `bahasa`.`id`  = `data`.`id_bahasa`
				WHERE `$cl0`.`$cl1`=\"$id\"
			";
    } else if ($collum == null && $id == null) {
        $sql = '
				SELECT * 
				FROM `data`
				INNER JOIN `tingkat` ON `tingkat`.`id`= `data`.`id_tingkat`
				INNER JOIN `jenis` ON `jenis`.`id`  = `data`.`id_jenis`
				INNER JOIN `bahasa` ON `bahasa`.`id`  = `data`.`id_bahasa`
			';
    }
    return fetchArray(mysqli_query($conn, $sql));
}

function getDataForDisplayReview($data)
{
    $temp                               = 0;
    $result['jmlMateri']                = count($data);
    $result['jumlahMateriVideoSelesai'] = 0;
    $result['jumlahMateriVideo']        = 0;
    $result['jumlahMateriSelesai']      = 0;
    $result['rataRataSelesai']             = 0;
    if (!empty($data)) {
        foreach ($data as $d) {
            $result['jumlahMateriVideoSelesai'] += $d['selesai'];
            $result['jumlahMateriVideo']        += $d['total'];
            if ($d['total'] == 0) $temp += 0;
            else $temp += (100 / $d['total']) * $d['selesai'];
            if ($d['selesai'] == $d['total']) $result['jumlahMateriSelesai']++;
        }
        $result['rataRataSelesai'] = number_format($temp / $result['jmlMateri'], 2);
    }
    return $result;
}

function getMasterData($table = 'data', $id = false)
{
    global $conn;
    if ($table == 'jenis' || $table == 'bahasa' || $table == 'tingkat') {
        if ($id) return fetchArray(mysqli_query($conn, "SELECT * FROM `$table` WHERE `id`='$id'"));
        else return fetchArray(mysqli_query($conn, "SELECT * FROM `$table`"));
    } else if ($table == 'data') {
        if ($id) return fetchArray(mysqli_query($conn, "SELECT * FROM `$table` WHERE `id_data`='$id'"));
        else return fetchArray(mysqli_query($conn, "SELECT * FROM `$table`"));
    } else return false;
}


function getMasterDataJumlah($table = 'jenis', $collum = 'id_jenis')
{
    $jumlah = [];
    $result = getMasterData($table);
    foreach ($result as $r) {
        $dataJumlah = getDataForDisplay('data.' . $collum, $r['id']);
        $jumlah[] = [
            'data' => $r,
            'jumlah' => $dataJumlah,
            'review' => getDataForDisplayReview($dataJumlah)
        ];
    }
    return $jumlah;
}

// Data Jenis
function getMasterDataJenisDetail()
{
    return getMasterDataJumlah('jenis', 'id_jenis');
}


// Data Bahasa
function getMasterDataBahasaDetail()
{
    return getMasterDataJumlah('bahasa', 'id_bahasa');
}


// Data Tingkat
function getMasterDataTingkatDetail()
{
    return getMasterDataJumlah('tingkat', 'id_tingkat');
}
// ============================================================
// END GET FUNCTION

// POST FUNCTION
// ============================================================
function postData()
{
    global $conn;
    $id_jenis   = $_POST['id_jenis'];
    $id_bahasa  = $_POST['id_bahasa'];
    $id_tingkat = $_POST['id_tingkat'];
    $nama       = $_POST['nama'];
    $catatan    = $_POST['catatan'];
    $total      = $_POST['total'];
    $selesai    = $_POST['selesai'];
    $sql = "INSERT INTO `data` 
				(`id_data`, `id_jenis`, `id_bahasa`, `id_tingkat`, `id_user`, `nama`, `catatan`, `total`, `selesai`) 
				VALUES 
				(NULL, '$id_jenis', '$id_bahasa', '$id_tingkat', '1', '$nama', '$catatan', '$total', '$selesai')";
    if (mysqli_query($conn, $sql)) {
        responseResult([], 201, true, "data was succesfully added");
    } else {
        responseResult([], 500, false, "internal server error");
    }
}

function postJenis()
{
    global $conn;
    $nama_jenis = $_POST['nama'];
    $sql = "INSERT INTO `jenis` (`id`, `nama_jenis`, `id_user`) VALUES (NULL, '$nama_jenis', '1')";
    if (mysqli_query($conn, $sql)) {
        responseResult([], 201, true, "data was succesfully added");
    } else {
        responseResult([], 500, false, "internal server error");
    }
}

function postTingkat()
{
    global $conn;
    $nama_tingkat = $_POST['nama'];
    $sql = "INSERT INTO `tingkat` (`id`, `nama_tingkat`, `id_user`) VALUES (NULL, '$nama_tingkat', '1')";
    if (mysqli_query($conn, $sql)) {
        responseResult([], 201, true, "data was succesfully added");
    } else {
        responseResult([], 500, false, "internal server error");
    }
}

function postBahasa()
{
    global $conn;
    $nama_bahasa = $_POST['nama'];
    $sql = "INSERT INTO `bahasa` (`id`, `nama_bahasa`, `id_user`) VALUES (NULL, '$nama_bahasa', '1')";
    if (mysqli_query($conn, $sql)) {
        responseResult([], 201, true, "data was succesfully added");
    } else {
        responseResult([], 500, false, "internal server error");
    }
}
// ============================================================
// END POST FUNCTION

// PUT FUNCTION
// ============================================================
function putData()
{
    global $conn;
    $id_data    = $_POST['id_data'];
    $id_jenis   = $_POST['id_jenis'];
    $id_bahasa  = $_POST['id_bahasa'];
    $id_tingkat = $_POST['id_tingkat'];
    $nama       = $_POST['nama'];
    $catatan    = $_POST['catatan'];
    $total      = $_POST['total'];
    $selesai    = $_POST['selesai'];

    $sql = "UPDATE `data` SET 
			`id_jenis`       = '$id_jenis', 
			`id_bahasa`      = '$id_bahasa', 
			`id_tingkat`     = '$id_tingkat', 
			`id_user`        = '1', 
			`nama`           = '$nama', 
			`catatan`        = '$catatan', 
			`total`          = '$total', 
			`selesai`        = '$selesai'
			WHERE 
			`data`.`id_data` = '$id_data'";
    if (mysqli_query($conn, $sql)) {
        responseResult([], 202, true, "data has been changed");
    } else {
        responseResult([], 500, false, "internal server error");
    }
}

function putJenis()
{
    global $conn;
    $id = $_POST['id'];
    $nama_jenis = $_POST['nama'];
    $sql = "UPDATE `jenis` SET `nama_jenis` = '$nama_jenis' WHERE `id`='$id'";
    if (mysqli_query($conn, $sql)) {
        responseResult([], 202, true, "data has been changed");
    } else {
        responseResult([], 500, false, "internal server error");
    }
}

function putTingkat()
{
    global $conn;
    $id = $_POST['id'];
    $nama_tingkat = $_POST['nama'];
    $sql = "UPDATE `tingkat` SET `nama_tingkat` = '$nama_tingkat' WHERE `id`='$id'";
    if (mysqli_query($conn, $sql)) {
        responseResult([], 202, true, "data has been changed");
    } else {
        responseResult([], 500, false, "internal server error");
    }
}

function putBahasa()
{
    global $conn;
    $id = $_POST['id'];
    $nama_bahasa = $_POST['nama'];
    $sql = "UPDATE `bahasa` SET `nama_bahasa` = '$nama_bahasa' WHERE `id`='$id'";
    if (mysqli_query($conn, $sql)) {
        responseResult([], 202, true, "data has been changed");
    } else {
        responseResult([], 500, false, "internal server error");
    }
}
// ============================================================
// END PUT FUNCTION

// DELETE FUNCTION
// ============================================================
function deleteData()
{
    global $conn;
    $id = $_GET['id'];
    $sql = "DELETE FROM `data` WHERE `data`.`id_data` = '$id'";
    if (mysqli_query($conn, $sql)) {
        responseResult([], 202, true, "data was deleted successfully");
    } else {
        responseResult([], 500, false, "internal server error");
    }
}

function deleteJenis()
{
    global $conn;
    $id = $_GET['id'];
    $sql = "DELETE FROM `jenis` WHERE `jenis`.`id` = '$id'";
    if (mysqli_query($conn, $sql)) {
        responseResult([], 202, true, "data was deleted successfully");
    } else {
        responseResult([], 500, false, "internal server error");
    }
}

function deleteTingkat()
{
    global $conn;
    $id = $_GET['id'];
    $sql = "DELETE FROM `tingkat` WHERE `tingkat`.`id` = '$id'";
    if (mysqli_query($conn, $sql)) {
        responseResult([], 202, true, "data was deleted successfully");
    } else {
        responseResult([], 500, false, "internal server error");
    }
}

function deleteBahasa()
{
    global $conn;
    $id = $_GET['id'];
    $sql = "DELETE FROM `bahasa` WHERE `bahasa`.`id` = '$id'";
    if (mysqli_query($conn, $sql)) {
        responseResult([], 202, true, "data was deleted successfully");
    } else {
        responseResult([], 500, false, "internal server error");
    }
}
// ============================================================
// END DELETE FUNCTION

// TOOLS
// ============================================================
function fetchArray($data)
{
    if ($data) {
        $temp = [];
        while ($row = mysqli_fetch_array($data, MYSQLI_ASSOC)) {
            $temp[] = $row;
        }
        return $temp;
    } else return [];
}

function defaultError()
{
    http_response_code(404);
    $data = [
        'response' => false,
        'message' => 'Menu ' . $_GET['get'] . ' not found'
    ];
    echo json_encode($data);
}

function responseResult($data, $coode, $response, $message)
{
    $data['response'] = $response;
    $data['message'] = $message;
    http_response_code(200);
    echo json_encode($data);
}

// ============================================================
// END TOOLS