// alert
var cekKoneksi = false;
var temporary  = {};
const baseurl  = 'http://iseplutpi.eu5.org/aplikasi/cpb/index.php';
function smartAlert(icon, title){
	const Toast = Swal.mixin({
		toast: true,
		position: 'top-end',
		showConfirmButton: false,
		timer: 10000
	});
	Toast.fire({
		icon: icon,
		title: title
	});
}

function layerSwitch(data = false){
	if (data){
		$('#detali-data-lengkap').removeAttr('style');
		$('#main-content').attr('style', 'display: none');
	}else {
		$('#main-content').removeAttr('style');
		$('#detali-data-lengkap').attr('style', 'display: none');
	}
}

function mainRender(data){
	$('#main-content').html(data);
}

function mainLoading(data = null){
	if (data == null) $('#main-content').html('<h3 class="text-center mt-5" id="loading-text">Loading...</h3>');
	else $('#main-content').html(`<h3 class="text-center mt-5" id="loading-text">${data}</h3>`);
}

function mainLoadingLayer2(data = null){
	if (data == null) $('#detali-data-lengkap').html('<h3 class="text-center mt-5" id="loading-text">Loading...</h3>');
	else $('#detali-data-lengkap').html(`<h3 class="text-center mt-5" id="loading-text">${data}</h3>`);
}

function dataReview(data){
	return `
		<div class="row">
			<div class="col-12 col-sm-6 col-md-3 zoom-hover">
				<div class="info-box">
					<span class="info-box-icon bg-info elevation-1"><i class="fas fa-book"></i></span>
					<div class="info-box-content">
						<span class="info-box-text">Jumlah Materi</span>
						<span class="info-box-number">
							${data.jmlMateri} Materi
						</span>
					</div>
					<!-- /.info-box-content -->
				</div>
				<!-- /.info-box -->
			</div>
			<!-- /.col -->
			<div class="col-12 col-sm-6 col-md-3 zoom-hover">
				<div class="info-box mb-3">
					<span class="info-box-icon bg-danger elevation-1"><i class="fas fa-bookmark"></i></span>
					<div class="info-box-content">
						<span class="info-box-text">Materi Selesai</span>
						<span class="info-box-number">${data.jumlahMateriSelesai} dari ${data.jmlMateri} Materi</span>
					</div>
					<!-- /.info-box-content -->
				</div>
				<!-- /.info-box -->
			</div>
			<!-- /.col -->
			<!-- fix for small devices only -->
			<div class="clearfix hidden-md-up"></div>
			<div class="col-12 col-sm-6 col-md-3 zoom-hover">
				<div class="info-box mb-3">
					<span class="info-box-icon bg-success elevation-1"><i class="fas fa-book"></i></span>
					<div class="info-box-content">
						<span class="info-box-text">Materi Selesai</span>
						<span class="info-box-number">${data.jumlahMateriVideoSelesai} Dari ${data.jumlahMateriVideo} Video</span>
					</div>
					<!-- /.info-box-content -->
				</div>
				<!-- /.info-box -->
			</div>
			<!-- /.col -->
			<div class="col-12 col-sm-6 col-md-3 zoom-hover">
				<div class="info-box mb-3">
					<span class="info-box-icon bg-warning elevation-1"><i class="far fa-bookmark"></i></span>
					<div class="info-box-content">
						<span class="info-box-text">Rata Rata Selesai</span>
						<span class="info-box-number">${data.rataRataSelesai}%</span>
					</div>
					<!-- /.info-box-content -->
				</div>
				<!-- /.info-box -->
			</div>
			<!-- /.col -->
		</div>
	`;
}

function base_url(data = false){
	if (data) return baseurl + data;
	else  return baseurl;
}

function detailData(data){
	const details = JSON.parse(data.dataset.detail);
	const modalBodyDetail = $('#modal-body-detail');
	const tableHead = `
		<div class="row">
			<div class="col">
				<table id="table-data-detail" class="table table-responsive table-bordered table-striped table-hover">
					<thead>
						<tr>
							<th>No</th>
							<th>Jenis</th>
							<th>Bahasa</th>
							<th>Tingkat</th>
							<th>Nama</th>
							<th>Total</th>
							<th>Selesai</th>
							<th>Presentase</th>
							<th>Opsi</th>
						</tr>
					</thead>
					<tbody>
		`;
	const tableFoot = `
		</tbody>
		<tfoot>
		<tr>
		<th>No</th>
		<th>Jenis</th>
		<th>Bahasa</th>
		<th>Tingkat</th>
		<th>Nama</th>
		<th>Total</th>
		<th>Selesai</th>
		<th>Presentase</th>
		<th>Opsi</th>
		</tr>
		</tfoot>
		</table>
		</div>
		<script>
		$("#table-data-detail").DataTable({
		"paging"      : true,
		"lengthChange": true, 
		"searching"   : true,
		"ordering"    : true, 
		"info"        : true, 
		"autoWidth"   : true,
		"responsive"  : true,
		});
		<\/script>
		</div>
		`;

	let tableBody = ``;

	details.forEach( (detail, index) => {
		tableBody += `
			<tr>
				<td>${index+1}</td>
				<td>${detail.nama_jenis}</td>
				<td>${detail.nama_bahasa}</td>
				<td>${detail.nama_tingkat}</td>
				<td>${detail.nama}</td>
				<td class="text-right">${detail.total}</td>
				<td class="text-right">${detail.selesai}</td>
				<td class="text-right">${Math.floor((100/detail.total)*detail.selesai)}%</td>
				<td class="text-right"><button data-dismiss="modal" onclick="detailDataLayer(${detail.id_data})" class="btn btn-info btn-xs zoom-hover btn-detail" >Detail</button></td>
			</tr>
		`;
	});

	return dataReview(JSON.parse(data.dataset.review)) + tableHead + tableBody + tableFoot;
}

function detailDataLayer(idxyz){
	cekKoneksi = false;
	mainLoadingLayer2();
	layerSwitch(true);
	const header = `
		<div class="content-header">
			<div class="container-fluid">
				<div class="row mb-2">
					<div class="col">
						<ol class="breadcrumb float-sm-right">
							<li class="breadcrumb-item"><a href="#">Master Data</a></li>
							<li class="breadcrumb-item active">Detail</li>
						</ol>
					</div><!-- /.col -->
				</div><!-- /.row -->
			</div><!-- /.container-fluid -->
		</div>	
		<section class="content">
			<div class="container-fluid">`;
	const footer = `
		</div>
		</section>

		<!-- modal hapus -->
		<div class="modal fade" id="modal-delete-detail-data" style="display: none;" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content bg-danger">
					<div class="modal-header">
						<h4 class="modal-title">Hapus Data</h4>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">×</span>
						</button>
					</div>
					<div class="modal-body" id="modal-body-delete-detail-data">
					</div>
					<div class="modal-footer justify-content-between">
						<button type="button" class="btn btn-outline-light" data-dismiss="modal">Close</button>
						<button id="btn-delete-detail-data" class="btn btn-outline-light" data-dismiss="modal">Delete</button>
					</div>
				</div>
				<!-- /.modal-content -->
			</div>
			<!-- /.modal-dialog -->
		</div>`;
	const formOption = (data, index)=>{
		const jenis = (data) => {
			let result = '';
			for (let i = 0; i < data.length; i++){
				if (data[i].id == index.id_jenis) result += `<option selected="" value="${data[i].id}">${data[i].nama_jenis}</option>`;
				else result += `<option value="${data[i].id}">${data[i].nama_jenis}</option>`;
			}
			return result;
		}
		const bahasa = (data) => {
			let result = '';
			for (let i = 0; i < data.length; i++){
				if (data[i].id == index.id_bahasa) result += `<option selected="" value="${data[i].id}">${data[i].nama_bahasa}</option>`;
				else result += `<option value="${data[i].id}">${data[i].nama_bahasa}</option>`;
			}
			return result;
		}
		const tingkat = (data) => {
			let result = '';
			for (let i = 0; i < data.length; i++){
				if (data[i].id == index.id_tingkat) result += `<option selected="" value="${data[i].id}">${data[i].nama_tingkat}</option>`;
				else result += `<option value="${data[i].id}">${data[i].nama_tingkat}</option>`;
			}
			return result;
		}
		return `
			<div class="row">
				<div class="container-fluid">
			  		<div class="card p-4">
						<form action="" method="post">
							<div class="row">
								<div class="col-md-8">
									<div class="form-group">
										<label for="nama_detail_data">Nama</label>
										<input disabled="" type="text" id="id_detail_data" name="id_detail_data" hidden="" value="${index.id_data}">
										<input disabled="" type="text" id="nama_detail_data" name="nama_detail_data" class="form-control" placeholder="Nama" value="${index.nama}" required="">
									</div>
								</div>
								<div class="col-md-4">
									<div class="form-group">
										<label for="jenis_detail_data">Jenis</label>
										<select disabled="" class="form-control select2" style="width: 100%;" id="jenis_detail_data" name="jenis_detail_data" required="">
											${jenis(data.jenis)}
										</select>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-4">
									<div class="form-group">
										<label for="bahasa_detail_data">Bahasa</label>
										<select disabled="" class="form-control select2" style="width: 100%;" id="bahasa_detail_data" name="bahasa_detail_data" required="">
											${bahasa(data.bahasa)}
										</select>
									</div>
								</div>
								<div class="col-md-4">
									<div class="form-group">
										<label for="tingkat_detail_data">Tingkat</label>
										<select disabled="" class="form-control select2" style="width: 100%;" id="tingkat_detail_data" name="tingkat_detail_data" required="">
											${tingkat(data.tingkat)}
										</select>
									</div>
								</div>
								<div class="col-md-2">
									<div class="form-group">
										<label for="total_detail_data">Total</label>
										<input disabled="" type="number" class="form-control" placeholder="Total" id="total_detail_data" name="total_detail_data" required="" value="${index.total}">
									</div>
								</div>
								<div class="col-md-2">
									<div class="form-group">
										<label for="selesai_detail_data">Selesai</label>
										<input disabled="" type="number" class="form-control" id="selesai_detail_data" name="selesai_detail_data" placeholder="Selesai" value="${index.selesai}">
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col">
									<div class="form-group">
										<label for="catatan_detail_data">Catatan</label>
										<textarea disabled="" name="catatan_detail_data" id="catatan_detail_data" class="form-control">${index.catatan}</textarea>
									</div>
								</div>
							</div>
							<bottom type="button" class="btn btn-secondary" name="back" onclick="layerSwitch()">Kembali</bottom>
							<button type="button" class="btn btn-primary" name="edit" onclick="editData_detail_data()">Edit</button>
							<button type="button" class="btn btn-primary" name="simpan" hidden="hidden" id="btn-simpan-data-detail">Simpan</button>
							<button type="button" class="btn btn-warning" name="reset" onclick="resetData_detail_data()" hidden="hidden">Reset</button>
							<button 
								type="button"
								class="btn btn-danger zoom-hover btn-delete"
								data-id="${index.id_data}"
								data-nama="${index.nama}" 
								onclick="hapusData_detail_data(this)"
								data-toggle="modal"
								data-target="#modal-delete-detail-data"
								name="delete"
							  >Delete</button>
						</form>
			  		</div>
				</div>
			</div>
		`;
	}
	const script = `
		<script>
			temporary['jenis_detail_data']   = $('#jenis_detail_data');
			temporary['bahasa_detail_data']  = $('#bahasa_detail_data');
			temporary['tingkat_detail_data'] = $('#tingkat_detail_data');
			temporary['nama_detail_data']    = $('#nama_detail_data');
			temporary['total_detail_data']   = $('#total_detail_data');
			temporary['selesai_detail_data'] = $('#selesai_detail_data');
			temporary['catatan_detail_data'] = $('#catatan_detail_data');
			temporary['temp_detail_data']    = [];

			function editData_detail_data(){
				temporary.jenis_detail_data.removeAttr("disabled");
				temporary.bahasa_detail_data.removeAttr("disabled");
				temporary.tingkat_detail_data.removeAttr("disabled");
				temporary.nama_detail_data.removeAttr("disabled");
				temporary.total_detail_data.removeAttr("disabled");
				temporary.selesai_detail_data.removeAttr("disabled");
				temporary.catatan_detail_data.removeAttr("disabled");
				temporary.temp_detail_data['jenis_detail_data']   = temporary.jenis_detail_data.val();
				temporary.temp_detail_data['bahasa_detail_data']  = temporary.bahasa_detail_data.val();
				temporary.temp_detail_data['tingkat_detail_data'] = temporary.tingkat_detail_data.val();
				temporary.temp_detail_data['nama_detail_data']    = temporary.nama_detail_data.val();
				temporary.temp_detail_data['total_detail_data']   = temporary.total_detail_data.val();
				temporary.temp_detail_data['selesai_detail_data'] = temporary.selesai_detail_data.val();
				temporary.temp_detail_data['catatan_detail_data'] = temporary.catatan_detail_data.val();
				$('button[name=reset]').removeAttr("hidden");
				$('button[name=simpan]').removeAttr("hidden");
				$('button[name=edit]').attr("hidden", "");
				$('button[name=delete]').attr("hidden", "");
			}

			function hapusData_detail_data(data){
				$('#modal-body-delete-detail-data').html(\`<p>Apakah anda yakin akan menghapus data <b>\${data.dataset.nama}</b> ..?</p>\`);
				$('#btn-delete-detail-data').attr('onclick', 'dashboard_delete('+ data.dataset.id +')');
			}

			function resetData_detail_data(){
				temporary.jenis_detail_data.val(temporary.temp_detail_data['jenis_detail_data']);
				temporary.bahasa_detail_data.val(temporary.temp_detail_data['bahasa_detail_data']);
				temporary.tingkat_detail_data.val(temporary.temp_detail_data['tingkat_detail_data']);
				temporary.nama_detail_data.val(temporary.temp_detail_data['nama_detail_data']);
				temporary.total_detail_data.val(temporary.temp_detail_data['total_detail_data']);
				temporary.selesai_detail_data.val(temporary.temp_detail_data['selesai_detail_data']);
				temporary.catatan_detail_data.val(temporary.temp_detail_data['catatan_detail_data']);
				$('button[name=edit]').removeAttr("hidden");
				$('button[name=delete]').removeAttr("hidden");
				$('button[name=reset]').attr("hidden", "");
				$('button[name=simpan]').attr("hidden", "");
				temporary.jenis_detail_data.attr("disabled", "");
				temporary.bahasa_detail_data.attr("disabled", "");
				temporary.tingkat_detail_data.attr("disabled", "");
				temporary.nama_detail_data.attr("disabled", "");
				temporary.total_detail_data.attr("disabled", "");
				temporary.selesai_detail_data.attr("disabled", "");
				temporary.catatan_detail_data.attr("disabled", "");
			}
			$('#btn-simpan-data-detail').on('click', ()=> {
				dashboard_ubah({
					id     : $('#id_detail_data').val(),
					nama   : $('#nama_detail_data').val(),
					jenis  : $('#jenis_detail_data').val(),
					bahasa : $('#bahasa_detail_data').val(),
					tingkat: $('#tingkat_detail_data').val(),
					total  : $('#total_detail_data').val(),
					selesai: $('#selesai_detail_data').val(),
					catatan: $('#catatan_detail_data').val()
				});
			});
		</script>
	`;
	const render = (data) => {
		const dataForm = (data.data.length == 0) ? `<h1 class="text-center">Kesalahan saat mengambil data</h1>` : formOption(data.dataTambah, data.data[0]);
		$('#detali-data-lengkap').html(header + dataReview(data.dataReview) + dataForm + footer + script);
		cekKoneksi = true;
	}
	const getData = () => {
		mainLoadingLayer2();
		$.ajax({
			url: base_url(),
			type: 'get',
			dataType: 'json',
			data: {
				'get': 'data',
				'id': idxyz},
			success: result => {
				if (result.response) render(result);
				else mainLoadingLayer2('Koneksi bermasalah');
			}
		});
	}
	const coba = ()=>{
		if (!cekKoneksi) {
			getData();
			setTimeout(()=>{
				if (!cekKoneksi) {
					mainLoadingLayer2('Masalah koneksi... Mencoba menghubungkan kembali');
					setTimeout(coba, 3000);
				}
			}, 3000);
		}
	}
	getData();
	setTimeout(coba, 7000);
}
