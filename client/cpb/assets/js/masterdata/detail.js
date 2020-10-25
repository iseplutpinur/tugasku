let jenis   = $('#jenis');
let bahasa  = $('#bahasa');
let tingkat = $('#tingkat');
let nama    = $('#nama');
let total   = $('#total');
let selesai = $('#selesai');
let catatan = $('#catatan');
let temp = [];

function editData(){
	jenis.removeAttr("disabled");
	bahasa.removeAttr("disabled");
	tingkat.removeAttr("disabled");
	nama.removeAttr("disabled");
	total.removeAttr("disabled");
	selesai.removeAttr("disabled");
	catatan.removeAttr("disabled");
	temp['jenis'] = jenis.val();
	temp['bahasa'] = bahasa.val();
	temp['tingkat'] = tingkat.val();
	temp['nama'] = nama.val();
	temp['total'] = total.val();
	temp['selesai'] = selesai.val();
	temp['catatan'] = catatan.val();
	$('button[name=reset]').removeAttr("hidden");
	$('button[name=simpan]').removeAttr("hidden");
	$('button[name=edit]').attr("hidden", "");
	$('button[name=delete]').attr("hidden", "");
}

function hapusData(data){
	$('#modal-body-delete').html(`<p>Apakah anda yakin akan menghapus data <b>${data.dataset.nama}</b> ..?</p>`);
	$('#btn-delete').attr('href', `${data.dataset.url}dashboard/hapus/${data.dataset.id}`);
}

function resetData(){
	jenis.val(temp['jenis']);
	bahasa.val(temp['bahasa']);
	tingkat.val(temp['tingkat']);
	nama.val(temp['nama']);
	total.val(temp['total']);
	selesai.val(temp['selesai']);
	catatan.val(temp['catatan']);
	$('button[name=edit]').removeAttr("hidden");
	$('button[name=delete]').removeAttr("hidden");
	$('button[name=reset]').attr("hidden", "");
	$('button[name=simpan]').attr("hidden", "");
	jenis.attr("disabled", "");
	bahasa.attr("disabled", "");
	tingkat.attr("disabled", "");
	nama.attr("disabled", "");
	total.attr("disabled", "");
	selesai.attr("disabled", "");
	catatan.attr("disabled", "");
}