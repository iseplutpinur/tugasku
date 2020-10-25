function dashboard(alert = null){
	cekKoneksi = false;
	const tableBody      = (data) => {
		let result = ``;
		data.forEach( function(el, i) {
			result += `
					<tr>
						<td style="width: 10px;">${i+1}</td>
						<td>${el.nama_jenis}</td>
						<td>${el.nama_bahasa}</td>
						<td>${el.nama_tingkat}</td>
						<td>${el.nama}</td>
						<td class="text-right">${el.total}</td>
						<td class="text-right">${el.selesai}</td>
						<td class="text-right">${((100/el.total)*el.selesai).toFixed(2)}%</td>
						<td class="text-nowrap">
							<button class="btn btn-info btn-xs zoom-hover btn-detail" onclick="detailDataLayer(${el.id_data})">Detail</button>
							<button 
								class="btn btn-warning btn-xs zoom-hover btn-edit"
								data-toggle="modal"
								data-target="#formModalEdit"
								data-id="${el.id_data}"
								data-id_jenis="${el.id_jenis}"
								data-id_bahasa="${el.id_bahasa}"
								data-id_tingkat="${el.id_tingkat}"
								data-nama="${el.nama}"
								data-catatan="${el.catatan}"
								data-total="${el.total}"
								data-selesai="${el.selesai}"
								onclick="editData(this)"
							  >Edit</button>
							<button 
								class="btn btn-danger btn-xs zoom-hover btn-delete"
								data-id="${el.id_data}" 
								data-nama="${el.nama}" 
								onclick="hapusData(this)"
								data-toggle="modal"
								data-target="#modal-delete"
							  >Delete</button>
						</td>
					</tr>
			`;
		});
		return result; }
	const modalTambah    = (data) => {
		let jenis = ``;
		data.jenis.forEach( function(el) {
			jenis += `<option value="${el.id}">${el.nama_jenis}</option>`;
		});
		let bahasa = ``;
		data.bahasa.forEach( function(el) {
			bahasa += `<option value="${el.id}">${el.nama_bahasa}</option>`;
		});
		let tingkat = ``;
		data.tingkat.forEach( function(el) {
			tingkat += `<option value="${el.id}">${el.nama_tingkat}</option>`;
		});

		return `
			<!-- modal form tambah -->
			<div class="modal fade" id="formModal" tabindex="-1" role="dialog" aria-labelledby="formModalLabel" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="formModalLabel">Tambah Data</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
						<form action="" method="post">
							<div class="row">
								<div class="col">
									<div class="form-group">
										<label for="nama">Nama</label>
										<input type="text" id="modal-tambah-nama" name="nama" class="form-control" placeholder="Nama" required="">
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label for="jenis">Jenis</label>
										<select class="form-control select2" style="width: 100%;" id="modal-tambah-jenis" name="jenis" required="">
										${jenis}
										</select>
									</div>
								</div>
								<div class="col-md-6">
									<div class="form-group">
										<label for="bahasa">Bahasa</label>
										<select class="form-control select2" style="width: 100%;" id="modal-tambah-bahasa" name="bahasa" required="">
										${bahasa}
										</select>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label for="tingkat">Tingkat</label>
										<select class="form-control select2" style="width: 100%;" id="modal-tambah-tingkat" name="tingkat" required="">
										${tingkat}
										</select>
									</div>
								</div>
								<div class="col-md-3">
									<div class="form-group">
										<label for="total">Total</label>
										<input type="number" class="form-control" placeholder="Total" id="modal-tambah-total" name="total" required="">
									</div>
								</div>
								<div class="col-md-3">
									<div class="form-group">
										<label for="selesai">Selesai</label>
										<input type="number" class="form-control" placeholder="Selesai" id="modal-tambah-selesai" name="selesai">
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col">
									<div class="form-group">
										<label for="catatan">Catatan</label>
										<textarea name="catatan" id="modal-tambah-catatan" class="form-control"></textarea>
									</div>
								</div>
							</div>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary" data-dismiss="modal">Kembali</button>
							<button type="button" class="btn btn-primary" data-dismiss="modal" id="modal-tambah-btn">Tambah</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		`; }
	const modalUbah      = (data) => {
		let jenis = ``;
		data.jenis.forEach( function(el) {
			jenis += `<option value="${el.id}">${el.nama_jenis}</option>`;
		});
		let bahasa = ``;
		data.bahasa.forEach( function(el) {
			bahasa += `<option value="${el.id}">${el.nama_bahasa}</option>`;
		});
		let tingkat = ``;
		data.tingkat.forEach( function(el) {
			tingkat += `<option value="${el.id}">${el.nama_tingkat}</option>`;
		});

		return `
			<!-- modal form ubah -->
			<div class="modal fade" id="formModalEdit" tabindex="-1" role="dialog" aria-labelledby="formModalLabel" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="formModalLabel">Ubah Data</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
						<form action="" method="post">
							<div class="row">
								<div class="col">
									<div class="form-group">
										<label for="nama-edit">Nama</label>
										<input type="text" id="nama-edit" name="nama-edit" class="form-control" placeholder="Nama" required="">
										<input type="text" id="id-edit" name="id-edit" hidden="">
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label for="jenis-edit">Jenis</label>
										<select class="form-control" id="jenis-edit" name="jenis-edit" required="">
										${jenis}
										</select>
									</div>
								</div>
								<div class="col-md-6">
									<div class="form-group">
										<label for="bahasa-edit">Bahasa</label>
										<select class="form-control" id="bahasa-edit" name="bahasa-edit" required="">
										${bahasa}
										</select>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label for="tingkat-edit">Tingkat</label>
										<select class="form-control" id="tingkat-edit" name="tingkat-edit" required="">
										${tingkat}
										</select>
									</div>
								</div>
								<div class="col-md-3">
									<div class="form-group">
										<label for="total-edit">Total</label>
										<input type="number" class="form-control" placeholder="Total" id="total-edit" name="total-edit" required="">
									</div>
								</div>
								<div class="col-md-3">
									<div class="form-group">
										<label for="selesai-edit">Selesai</label>
										<input type="number" class="form-control" placeholder="Selesai" id="selesai-edit" name="selesai-edit" required="">
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col">
									<div class="form-group">
										<label for="catatan-edit">Catatan</label>
										<textarea name="catatan-edit" id="catatan-edit" class="form-control"></textarea>
									</div>
								</div>
							</div>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary" data-dismiss="modal" required="">Kembali</button>
							<button type="button" class="btn btn-primary"  data-dismiss="modal" name="tambah" id="btn-edit-modal">Edit</button>
							</form>
						</div>
					</div>
				</div>
			</div>`;}
	const modalHapus     = ()     => {
		return `
			<!-- modal hapus -->
			<div class="modal fade" id="modal-delete" style="display: none;" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content bg-danger">
						<div class="modal-header">
							<h4 class="modal-title">Hapus Data</h4>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">×</span>
							</button>
						</div>
						<div class="modal-body" id="modal-body-delete">
						</div>
						<div class="modal-footer justify-content-between">
							<button type="button" class="btn btn-outline-light" data-dismiss="modal">Close</button>
							<button type="button" id="btn-delete" class="btn btn-outline-light" data-dismiss="modal">Delete</button>
						</div>
					</div>
					<!-- /.modal-content -->
				</div>
				<!-- /.modal-dialog -->
			</div>
		`; }
	const scriptBody     = `
		<div class="content-header">
			<div class="container-fluid">
				<div class="row mb-2">
					<div class="col-sm-6">
						<h1 class="m-0 text-dark">Aplikasi Catatan Progres Belajar</h1>
					</div><!-- /.col -->
					<div class="col-sm-6">
						<ol class="breadcrumb float-sm-right">
							<li class="breadcrumb-item"><a href="#">Home</a></li>
							<li class="breadcrumb-item active">Dashboard</li>
						</ol>
					</div><!-- /.col -->
				</div><!-- /.row -->
			</div><!-- /.container-fluid -->
			</div>	
			<section class="content">
				<div class="container-fluid">
					`;
	const tableHeader    = `
		<div class="row">
			<div class="container-fluid">
		  		<div class="card">
		   	 		<div class="card-header d-flex justify-content-between align-items-center">
					    <h5 class="my-0 mr-md-auto font-weight-normal">Data Progres Belajar</h5>
					    <!-- modal bootom -->
					    <button type="button" data-url="" class="btn btn-primary tombolTambahData" data-toggle="modal" data-target="#formModal">Tambah</button>
		    		</div>
		    		<div class="card-body">
						<table id="table-data" class="table table-responsive table-bordered table-striped table-hover">
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
	const tableFooter    = `
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
		</div>
		</div>
		</div>
		</div>
		</section>
		`;
	const scriptFooter   = `
			<script>
			$(function () {
				$('#table-data').DataTable({
					"paging": true,
					"lengthChange": true,
					"searching": true,
					"ordering": true,
					"info": true,
					"autoWidth": true,
					"responsive": true,
					"columnDefs": [
						{ "orderable": false, "targets": [8] }
					]
				});

				// //Initialize Select2 Elements
				$('.select2').select2();

				// //Initialize Select2 Elements
				$('.select2bs4').select2({
					theme: 'bootstrap4'
				});
			});


			function editData(data){
				$('#id-edit').val(data.dataset.id);
				$('#nama-edit').val(data.dataset.nama);
				$('#jenis-edit').val(data.dataset.id_jenis);
				$('#bahasa-edit').val(data.dataset.id_bahasa);
				$('#tingkat-edit').val(data.dataset.id_tingkat);
				$('#total-edit').val(data.dataset.total);
				$('#selesai-edit').val(data.dataset.selesai);
				$('#catatan-edit').val(data.dataset.catatan);
			}

			function hapusData(data){
				$('#modal-body-delete').html(\`<p>Apakah anda yakin akan menghapus data <b>\${data.dataset.nama}</b> ..?</p>\`);
				$('#btn-delete').attr('onclick', 'dashboard_delete('+ data.dataset.id +')');

			}

			$('#modal-tambah-btn').on('click', ()=> {
				dashboard_tambah({
					nama   : $('#modal-tambah-nama').val(),
					tingkat: $('#modal-tambah-tingkat').val(),
					bahasa : $('#modal-tambah-bahasa').val(),
					jenis  : $('#modal-tambah-jenis').val(),
					selesai: $('#modal-tambah-selesai').val(),
					total  : $('#modal-tambah-total').val(),
					catatan: $('#modal-tambah-catatan').val()
				});
			});


			$('#btn-edit-modal').on('click', ()=> {
				dashboard_ubah({
					id     : $('#id-edit').val(),
					nama   : $('#nama-edit').val(),
					jenis  : $('#jenis-edit').val(),
					bahasa : $('#bahasa-edit').val(),
					tingkat: $('#tingkat-edit').val(),
					total  : $('#total-edit').val(),
					selesai: $('#selesai-edit').val(),
					catatan: $('#catatan-edit').val()
				});
			});
			</script>
			`;
	const dashboard_render = (data) =>{
		const table = tableHeader + tableBody(data.data) + tableFooter;
		const modal = modalTambah(data.dataTambah) + modalUbah(data.dataTambah) + modalHapus();
		mainRender(scriptBody + dataReview(data.dataReview) + table + modal + scriptFooter);
		if (alert != null) smartAlert(alert.icon, alert.text);
		cekKoneksi = true;
	}
	const getData = ()=>{
		mainLoading();
		$.ajax({
			url: base_url(),
			type: 'get',
			dataType: 'json',
			data: {
				'get': 'data'},
			success: result => {
				if (result.response) dashboard_render(result);
				else mainLoading('Koneksi bermasalah');
			}
		});
	}
	const coba = ()=>{
		if (!cekKoneksi) {
			getData();
			setTimeout(()=>{
				if (!cekKoneksi) {
					mainLoading('Masalah koneksi... Mencoba menghubungkan kembali');
					setTimeout(coba, 3000);
				}
			}, 3000);
		}
	}
	getData();
	setTimeout(coba, 7000);
}

function dashboard_delete(id){
	cekKoneksi = false;
	layerSwitch();
	const act = () => {		
		mainLoading();
		$.ajax({
			url: base_url(),
			type: 'get',
			dataType: 'json',
			data: {
				'delete': 'data',
				'id': id},
			success: result => {
				if (result.response) {
					dashboard({icon: 'success', text: "berhasil menghapus data"});
					cekKoneksi = true;					
				} else dashboard({icon: 'falied', text: "gagal menghapus data"});
			}
		});
	};
	setTimeout(act,500);

	const coba = ()=>{
		if (!cekKoneksi) {			
			act();
			setTimeout(()=>{
				if (!cekKoneksi) {					
					mainLoading('Masalah koneksi... Mencoba menghubungkan kembali');
					setTimeout(coba, 3000);
				}
			}, 3000);
		}
	}
	setTimeout(coba, 7000);
}

function dashboard_tambah(data){
	cekKoneksi = false;
	layerSwitch();
	const act = () => {
		mainLoading();
		$.ajax({
			url: base_url("?post=data"),
			type: 'post',
			dataType: 'json',
			data: {
				'nama': data.nama,
				'id_jenis': data.jenis,
				'id_bahasa': data.bahasa,
				'id_tingkat': data.tingkat,
				'catatan': data.catatan,
				'total': data.total,
				'selesai': data.selesai,
			},
			success: result => {
				if (result.response) dashboard({icon: 'success', text: "berhasil menambahkan data"});
				else dashboard({icon: 'falied', text: "gagal menambahkan data"});
	
			}
		});
	};
	setTimeout(act,500);

	const coba = ()=>{
		if (!cekKoneksi) {			
			act();
			setTimeout(()=>{
				if (!cekKoneksi) {					
					mainLoading('Masalah koneksi... Mencoba menghubungkan kembali');
					setTimeout(coba, 3000);
				}
			}, 3000);
		}
	}
	setTimeout(coba, 7000);
}

function dashboard_ubah(data){
	cekKoneksi = false;
	layerSwitch();
	const act = () => {
		mainLoading();
		$.ajax({
			url: base_url("?put=data"),
			type: 'post',
			dataType: 'json',
			data: {
				'nama': data.nama,
				'id_data': data.id,
				'id_jenis': data.jenis,
				'id_bahasa': data.bahasa,
				'id_tingkat': data.tingkat,
				'catatan': data.catatan,
				'total': data.total,
				'selesai': data.selesai,
			},
			success: result => {
				if (result.response) dashboard({icon: 'success', text: "berhasil mengubah data"});
				else dashboard({icon: 'falied', text: "gagal mengubah data"});
	
			}
		});
	};
	setTimeout(act,500);

	const coba = ()=>{
		if (!cekKoneksi) {			
			act();
			setTimeout(()=>{
				if (!cekKoneksi) {					
					mainLoading('Masalah koneksi... Mencoba menghubungkan kembali');
					setTimeout(coba, 3000);
				}
			}, 3000);
		}
	}
	setTimeout(coba, 7000);
}