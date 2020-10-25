function detailData(data){
	const details = JSON.parse(data.dataset.detail);
	const modalBodyDetail = $('#modal-body-detail');
	const tableHead = `
		<div class="row">
			<div class="col table-responsive">
				<table id="table-data-detail" class="table table-bordered table-striped table-hover">
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
				<td class="text-right"><a href="${data.dataset.url}masterdata/detail/${detail.id_data}/${data.dataset.back}" class="btn btn-info btn-xs zoom-hover btn-detail" >Detail</a></td>
			</tr>
		`;
	});


	
	const reviews = JSON.parse(data.dataset.review);
	const reviewDisplay = `
		<div class="row">
			<div class="col-12 col-sm-6 col-md-3 zoom-hover">
				<div class="info-box">
					<span class="info-box-icon bg-info elevation-1"><i class="fas fa-book"></i></span>
					<div class="info-box-content">
						<span class="info-box-text">Jumlah Materi</span>
						<span class="info-box-number">
							${reviews.jmlMateri} Materi
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
						<span class="info-box-number">${reviews.jumlahMateriSelesai} dari ${reviews.jmlMateri} Materi</span>
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
						<span class="info-box-number">${reviews.jumlahMateriVideoSelesai} Dari ${reviews.jumlahMateriVideo} Video</span>
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
						<span class="info-box-number">${reviews.rataRataSelesai}%</span>
					</div>
					<!-- /.info-box-content -->
				</div>
				<!-- /.info-box -->
			</div>
			<!-- /.col -->
		</div>
	`;
	$("#modalDetailLabel").html(`Detail data ${data.dataset.nama}`);
	modalBodyDetail.html(reviewDisplay + tableHead + tableBody + tableFoot);
}