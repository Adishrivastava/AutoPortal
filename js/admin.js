

// individual divs for inspection form
const external = document.querySelector('#external');
const internal = document.querySelector('#internal');
const engine = document.querySelector('#engine');
const air = document.querySelector('#air');
const sheering = document.querySelector('#sheer');

//getting individual buttons for adding inputs in inspection form
const externalbtn = document.querySelector('#externalbtn');
const internalbtn = document.querySelector('#internalbtn');
const enginebtn = document.querySelector('#enginebtn');
const airbtn = document.querySelector('#airbtn');
const steerbtn = document.querySelector('#steerbtn');

//input data fileds for general form
const date = document.querySelector('#date');
const name = document.querySelector('#name');
const age = document.querySelector('#age');
const mobile = document.querySelector('#mobile');
const kms = document.querySelector('#kms');

//global variable for containing doc.id
var docid = '';

// checing if verified
function check() {
	// if(document.getElementById('verified').checked == true)  {
	document.getElementById('verified-show').style.display = 'block';

}

// chcecking if non verified
function uncheck() {
	// if(document.getElementById('nonverified').checked == true)  {

	document.getElementById('verified-show').style.display = 'none';
	
}

// ===================== adding input fields of inspection ====================== //

const add = (fieldname) => {
	let externalfield = document.createElement('input');
	externalfield.className = 'form-control';
	fieldname.appendChild(externalfield);
};

const form = document.querySelector('#stock-form');

externalbtn.addEventListener('click', () => {
	add(external);
});
internalbtn.addEventListener('click', () => {
	add(internal);
});
enginebtn.addEventListener('click', () => {
	add(engine);
});
airbtn.addEventListener('click', () => {
	add(air);
});
steerbtn.addEventListener('click', () => {
	add(steer);
});

var externals = [];
var internals = [];
var engines = [];
var airs = [];
var steers = [];

// adding inputs in external
function externalfunc(id) {
	var inputCount = document
		.getElementById('external')
		.getElementsByTagName('input').length;
	var x = document.getElementById('external').querySelectorAll('input');

	externals = [];
	for (let i = 0; i < inputCount; i++) {
		externals.push(x[i].value);
	}
	db.collection('stocks').doc(id).update({ externals });
}

// adding inputs in iternal
function internalfunc(id) {
	var inputCount = document
		.getElementById('internal')
		.getElementsByTagName('input').length;
	var x = document.getElementById('internal').querySelectorAll('input');

	internals = [];
	for (let i = 0; i < inputCount; i++) {
		internals.push(x[i].value);
	}
	db.collection('stocks').doc(id).update({ internals });
}

// adding inputs in engine
function enginefunc(id) {
	var inputCount = document
		.getElementById('engine')
		.getElementsByTagName('input').length;
	var x = document.getElementById('engine').querySelectorAll('input');

	engines = [];
	for (let i = 0; i < inputCount; i++) {
		engines.push(x[i].value);
	}
	db.collection('stocks').doc(id).update({ engines });
}

//adding inputs in air
function airfunc(id) {
	var inputCount = document.getElementById('air').getElementsByTagName('input')
		.length;
	var x = document.getElementById('air').querySelectorAll('input');

	airs = [];
	for (let i = 0; i < inputCount; i++) {
		airs.push(x[i].value);
	}
	db.collection('stocks').doc(id).update({ airs });
}

// adding inputs in steer
function steerfunc(id) {
	var inputCount = document
		.getElementById('steer')
		.getElementsByTagName('input').length;
	var x = document.getElementById('steer').querySelectorAll('input');

	steers = [];
	for (let i = 0; i < inputCount; i++) {
		steers.push(x[i].value);
	}
	db.collection('stocks').doc(docid).update({ steers });
}

// ========================= uploading images ==================== //
var selDiv = '';
var storedFiles = [];

$(document).ready(function () {
	$('#files').on('change', handleFileSelect);

	selDiv = $('#selectedFiles');

	$('body').on('click', '.selFile', removeFile);
});

var storage = firebase.storage();

function handleFileSelect(e) {
	var files = e.target.files;
	var filesArr = Array.prototype.slice.call(files);
	filesArr.forEach(function (f) {
		if (!f.type.match('image.*')) {
			return;
		}

		storedFiles.push(f);

		var reader = new FileReader();
		reader.onload = function (e) {
			var html =
				"<div class=''><img src=\"" +
				e.target.result +
				'" data-file=\'' +
				f.name +
				"' class='selFile' title='Click to remove' style='position:relative; left:50%; transform:translate(-50%,0)'><br clear=\"left\"/></div>";
			selDiv.append(html);
		};
		reader.readAsDataURL(f);
	});
}

function removeFile(e) {
	var file = $(this).data('file');
	for (var i = 0; i < storedFiles.length; i++) {
		if (storedFiles[i].name === file) {
			storedFiles.splice(i, 1);
			break;
		}
	}
	$(this).parent().remove();
}

// ================= saving the stock input form to database =============== //
const formStock = document.querySelector('#stockform');
var brand = document.getElementById('brand').value;

// getting data from lead
formStock.addEventListener('submit', (e) => {
	e.preventDefault();

	if (document.getElementById('verified').checked == true) {
		const formv = document.querySelector('#verified-show');

		var r1 = formv.ratingExternal.value;
		var r2 = formv.ratingInternal.value;
		var r3 = formv.ratingEngine.value;
		var r4 = formv.ratingAir.value;
		var r5 = formv.ratingSteer.value;
		var emi = formv.emi.value;
		var rate = formv.rate.value;
		var tenure = formv.tenure.value;
		console.log(formStock.brand.value);
		db.collection('stocks')
			.add({
				verified: formStock.veri.value,
				entry: formStock.entry.value,
				price: formStock.price.value,
				name: formStock.nameSeller.value,
				email: formStock.emailSeller.value,
				mobile: formStock.mobileSeller.value,
				brand: formStock.brand.value,
				model: formStock.model.value,
				age: formStock.age.value,
				kms: formStock.kms.value,
				registration: formStock.regisno.value,
				location: formStock.location.value,
				fuel: formStock.fuel.value,
				transmission: formStock.transmission.value,
				rto: formStock.rto.value,
				emi:
				ratingEx: r1,
				ratingIn: r2,
				ratingEn: r3,
				ratingAir: r4,
				ratingSt: r5,
			})
			.then(function (docRef) {
				docid = docRef.id;
				console.log(docid);

				externalfunc(docid);

				internalfunc(docid);
				enginefunc(docid);
				airfunc(docid);
				steerfunc(docid);

				for (var i = 0, len = storedFiles.length; i < len; i++) {
					// data.append('files', storedFiles[i]);
					const name = docid + '/' + i;

					const metadata = {
						contentType: storedFiles[i].type,
					};
					const ref = firebase.storage().ref();
					const task = ref
						.child(name)
						.put(storedFiles[i])
						.then(function (snapshot) {
							console.log('Uploaded a blob or file!');
						});
				}
			});
	} else {
		console.log(formStock.brand.value);
		db.collection('stocks')
			.add({
				verified: formStock.veri.value,
				entry: formStock.entry.value,
				price: formStock.price.value,
				name: formStock.nameSeller.value,
				email: formStock.emailSeller.value,
				mobile: formStock.mobileSeller.value,
				brand: formStock.brand.value,
				model: formStock.model.value,
				age: formStock.age.value,
				trim: formStock.kms.value,
				registration: formStock.regisno.value,
				location: formStock.location.value,
				fuel: formStock.fuel.value,
				transmission: formStock.transmission.value,
				rto: formStock.rto.value,
			
			})
			.then(function (docRef) {
				docid = docRef.id;

				console.log(docid);

				for (var i = 0, len = storedFiles.length; i < len; i++) {
					// data.append('files', storedFiles[i]);
					const name = docid + '/' + i;

					const metadata = {
						contentType: storedFiles[i].type,
					};
					const ref = firebase.storage().ref();
					const task = ref
						.child(name)
						.put(storedFiles[i])
						.then(function (snapshot) {
							console.log('Uploaded a blob or file!');
						});
				}
			});
	}
});

// =============== putting data to the stocks table ====================== //
const Stocklist = document.querySelector('#stock-list');
const Stocktable = document.getElementById('stocks-table');

function rendorStock(doc) {
	var t = $('#stocks-table').DataTable();
	t.row
		.add([
			doc.data().entry,
			doc.data().name,
			doc.data().price,
			doc.data().brand,
			doc.data().mobile,
			doc.data().location,
			"<button class='btn btn-danger click' onclick='remove(this.id," +
				'"stocks"' +
				")' id='" +
				doc.id +
				"'>delete</button>",
		])
		.draw(false);
}

function remove(id, col) {
	var b = document.getElementById(id).parentElement;
	b.parentElement.remove();
	db.collection(col).doc(id).delete();
}

//putting data to the leads table ==============
db.collection('stocks')
	.get()
	.then((snapshot) => {
		snapshot.docs.forEach((doc) => {
			rendorStock(doc);
		});
	});

$.fn.dataTable.ext.errMode = 'none';

// ================== section for adding data to leads table ============== //

// declaring variables ==========================
const sendermail = document.querySelector('#senderInput');
const senderpassword = document.querySelector('#senderPass');
const receiveremail = document.querySelector('#receiverInput');
const Leadlist = document.querySelector('#lead-list');

//rendoring function
function rendorLead(doc) {

	var name = doc.data().name;
	var model = doc.data().model;
	var email = doc.data().email;
	var age = doc.data().email;
	var mobile = doc.data().mobile;
	var location = doc.data().location;

	var customer = doc.data().customer;

	$('#leads-table')
		.DataTable()
		.row.add([
			name,
			email,
			model,
			mobile,
			location,
			customer,

			"<button class='btn btn-danger click' onclick='remove(this.id," +
				'"leads"' +
				")' id='" +
				doc.id +
				"'>delete</button>",
		])
		.draw(false);
}

// putting data to the leads table ==============
db.collection('leads')
	.get()
	.then((snapshot) => {
		snapshot.docs.forEach((doc) => {
			rendorLead(doc);
		});
	});

// ================= senders email and password ====================
db.collection('admin-emails')
	.doc('senders')
	.get()
	.then((snapshot) => {
		let sender = document.createElement('input');
		let password = document.createElement('input');
		sender.className = 'form-control in';
		sender.name = 'sender';
		password.name = 'password';
		password.className = 'form-control in';

		sender.value = snapshot.data().email;
		password.value = snapshot.data().password;
		sendermail.appendChild(sender);
		senderpassword.appendChild(password);

		let receiver = document.createElement('input');
		receiver.className = 'form-control in';
		receiver.name = 'receiver';
		receiver.value = snapshot.data().receiveremail;
		receiveremail.appendChild(receiver);
	});

// ================ putting email data of receiver =================

var senderform = document.getElementById('sender-form');
var receiverform = document.getElementById('receiver-form');

senderform.addEventListener('submit', (e) => {
	e.preventDefault();
	db.collection('admin-emails')
		.doc('senders')
		.update({
			email: senderform.sender.value,
			password: senderform.password.value,
		})
		.then((snapshot) => {
			console.log('Asdasd');
		});
});

receiverform.addEventListener('click', (e) => {
	e.preventDefault();
	db.collection('admin-emails').doc('senders').update({
		receiveremail: receiverform.receiver.value,
	});
});
