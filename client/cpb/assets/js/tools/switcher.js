$(".navigation").on('click', function(event) {
	let allNav = $(".navigation");
	event.preventDefault();
	for(let i = 0; i < allNav.length; i++){
		if (this == allNav[i]) {
			allNav[i].setAttribute('class', 'nav-link navigation active');
			switchMenu(this.id);
		} else allNav[i].setAttribute('class', 'nav-link navigation');
	}
});

function switchMenu(id){
	layerSwitch();
	mainLoading();
	cekKoneksi = false;
	switch (id) {
		case 'dashboard':
			dashboard();
			break;
		case 'jenis':
			jenis();
			break;
		case 'bahasa':
			bahasa();
			break;
		case 'tingkat':
			tingkat();
			break;
		default:
			mainRender('error');
			break;
	}
}

dashboard();