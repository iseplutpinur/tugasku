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
			{ "orderable": false, "targets": [4] }
		]
  });
});

function editData(data){
	$('#nama-edit').val(data.dataset.nama);
	$('#id-edit').val(data.dataset.id);
}


function hapusData(data){
	$('#modal-body-delete').html(`<p>Apakah anda yakin akan menghapus data <b>${data.dataset.nama}</b> ..?</p>`);
	$('#btn-delete').attr('href', `${data.dataset.url}masterdata/jenis_hapus/${data.dataset.id}`);
}