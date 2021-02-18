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
				"<div class='col-md-3'><img src=\"" +
				e.target.result +
				'" data-file=\'' +
				f.name +
				"' class='selFile' title='Click to remove' style='width:100%;height:100%;'><br clear=\"left\"/></div>";
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

const form = document.querySelector('#add-data');

// getting data from lead
form.addEventListener('submit', (e) => {
	e.preventDefault();
	db.collection('leads')
		.add({
			brand: form.brand.value,
			model: form.model.value,
			email: form.email.value,
			name: form.name.value,
			age: form.carage.value,
			mobile: form.mobile.value,
			location: form.location.value,
			trim: form.trim.value,
			registration: form.regisno.value,
			kms: form.kms.value,
			customer: 'seller',
		})
		.then(function (docRef) {
			console.log('Document written with ID: ', docRef.id);
			for (var i = 0, len = storedFiles.length; i < len; i++) {
				// data.append('files', storedFiles[i]);
				const name = 'seller' + '/' + docRef.id + '/' + i;
				console.log(name);
				const metadata = {
					contentType: storedFiles[i].type,
				};
				const ref = firebase.storage().ref();
				const task = ref
					.child(name)
					.put(storedFiles[i])
					.then(function (snapshot) {
						db.collection('admin-emails')
							.doc('senders')
							.get()
							.then(function (snapshot) {
								var storage = firebase.storage();
								console.log(docRef.id);
								// Create a storage reference from our storage service
								var storageRef = storage.ref();
								let senderEmail = snapshot.data().email;
								let senderPassword = snapshot.data().password;
								let receiverEmail = snapshot.data().receiveremail;
								storageRef
									.child('seller' + '/' + docRef.id + '/0')
									.getDownloadURL()
									.then(function (url) {
										window.location.href = `http://webaditya29.000webhostapp.com/travelhub/mailingseller.php?name=${form.name.value}&email=${form.email.value}&mobile=${form.mobile.value}&location=${form.location.value}&model=${form.model.value}&brand=${form.brand.value}&customer=seller&age=${form.carage.value}&kms=${form.kms.value}&customer=seller&senderEmail=${senderEmail}&senderPassword=${senderPassword}&url=${url}&receiverEmail=${receiverEmail}`;
									});
							});
					})
					.catch(function (e) {
						console.log('not done');
					});
			}
		})
		.catch(function (error) {
			console.error('Error adding document: ', error);
		});
});

// ========== putting the stock data from backend to frontend ==============
var dropdown = document.querySelector('.dropdown-item');
var stockrow = document.getElementById('stockItems');

// function brandfilterfunc(id) {

//     while (stockrow.firstChild) stockrow.removeChild(stockrow.firstChild);

//     db.collection("stocks").where("brand", "==", id).limit(6)
//         .get()
//         .then(function (querySnapshot) {
//             querySnapshot.forEach(function (doc) {
//                 // doc.data() is never undefined for query doc snapshots
//                 console.log(doc.id, " => ", doc.data());

//                 var html = '<div class="col-lg-4 col-md-6 col-12 pl-5 pr-5 mb-3"><div class="media d-block media-feature text-center"><img src="img/car4.webp" style="width: 100%; height: 160px;" alt=""><div class="media-body"><h3 class="mt-3 text-black" style="font-size: 1.4em;">' + doc.data().brand + '</h3><p class="mt-3"><span>3 YEARS </span> <span class="ml-5">' + doc.data().age + ' DRIVEN</span></p><p class="mb-0"><a href="details.html?name=' + doc.id + '" class="btn btn-primary">Veiw full details</a></p></div></div></div>';

//                 stockrow.innerHTML += html;

//             });

//         })
//         .catch(function (error) {
//             console.log("Error getting documents: ", error);
//         });
//     console.log(id);
// }

const filp = document.getElementById('filp');
const filb = document.getElementById('filb');

function pricefilterfunc(lower) {
	while (stockrow.firstChild) stockrow.removeChild(stockrow.firstChild);
	let higher;
	if (filp.value == 0) {
		higher = 200000;
	} else if (filp.value == 200000) {
		higher = 500000;
	} else if (filp.value == 500000) {
		higher = 1000000;
	} else {
		higher = 10000000;
	}

	console.log(lower);
	console.log(higher);
	var i = 0;
	db.collection('stocks')
		.where('brand', '==', filb.value)
		.get()
		.then(function (querySnapshot) {
			querySnapshot.forEach(function (doc) {
				// doc.data() is never undefined for query doc snapshots
				console.log(higher);
				if (
					doc.data().price < higher &&
					i < 6 &&
					doc.data().price > filp.value
				) {
					var storage = firebase.storage();

					// Create a storage reference from our storage service
					var storageRef = storage.ref();

					let imgs;
					storageRef
						.child(doc.id + '/0')
						.getDownloadURL()
						.then(function (url) {
							var html =
								'<div class="col-lg-4 col-md-6 col-12 pl-5 pr-5 mb-3"><div class="media d-block media-feature text-center"><img src="' +
								url +
								'" style="width: 100%; height: 160px;" alt=""><div class="media-body"><h3 class="mt-3 text-black" style="font-size: 1.4em;">' +
								doc.data().brand +
								'</h3><p class="mt-3"><span>' +
								doc.data().age +
								' YEARS </span> <span class="ml-5">' +
								doc.data().kms +
								'km</span></p><p class="mb-0"><a href="details.html?name=' +
								doc.id +
								'" class="btn btn-primary">Veiw full details</a></p></div></div></div>';
							stockrow.innerHTML += html;
							i++;
						})
						.catch(function (error) {
							console.log(error);
						});
				}
				i = 0;
			});
		})
		.catch(function (error) {
			console.log('Error getting documents: ', error);
		});
}

let higher;
if (filp.value == 0) {
	higher = 200000;
} else if (filp.value == 200000) {
	higher = 500000;
} else if (filp.value == 500000) {
	higher = 1000000;
} else {
	higher = 10000000;
}

var i = 0;
db.collection('stocks')
	.where('brand', '==', filb.value)
	.get()
	.then(function (querySnapshot) {
		querySnapshot.forEach(function (doc) {
			// doc.data() is never undefined for query doc snapshots
			console.log(doc.id, ' => ', doc.data());

			if (
				doc.data().price < higher &&
				i < 6 &&
				doc.data().price > filp.value
			) {
				var storage = firebase.storage();

				// Create a storage reference from our storage service
				var storageRef = storage.ref();

				let imgs;
				storageRef
					.child(doc.id + '/0')
					.getDownloadURL()
					.then(function (url) {
						var html =
							'<div class="col-lg-4 col-md-6 col-12 pl-5 pr-5 mb-3"><div class="media d-block media-feature text-center"><img src="' +
							url +
							'" style="width: 100%; height: 160px;" alt=""><div class="media-body"><h3 class="mt-3 text-black" style="font-size: 1.4em;">' +
							doc.data().brand +
							'</h3><p class="mt-3"><span>' +
							doc.data().age +
							' YEARS </span> <span class="ml-5">' +
							doc.data().kms +
							'km</span></p><p class="mb-0"><a href="details.html?name=' +
							doc.id +
							'" class="btn btn-primary">Veiw full details</a></p></div></div></div>';
						stockrow.innerHTML += html;
						i++;
					})
					.catch(function (error) {
						console.log(error);
					});
			}
			i = 0;
		});
	})
	.catch(function (error) {
		console.log('Error getting documents: ', error);
	});
