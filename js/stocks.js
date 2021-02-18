var stockfull = document.getElementById('stockFull');

db.collection('stocks')
	.get()
	.then(function (querySnapshot) {
		querySnapshot.forEach(function (doc) {
			// doc.data() is never undefined for query doc snapshots
			console.log(doc.id, ' => ', doc.data());

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
					stockfull.innerHTML += html;
					i++;
				})
				.catch(function (error) {
					console.log(error);
				});
			i = 0;
		});
	})
	.catch(function (error) {
		console.log('Error getting documents: ', error);
	});
