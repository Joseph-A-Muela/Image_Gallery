var parentContainer = $('.parentContainer');
var icon = $('.glyphicon-plus-sign');
var addBtn = $('.addBtn');
var cancelBtn = $('.cancelBtn');
var urlImage = $('.urlImage');
var urlCaption = $('.urlCaption');
var photoReal = $('.photoReal');
var imgContainer = $('.imgContainer');
var deleteAllBtn = $('.deleteAllBtn');
var url = 'http://small-tiyfe.herokuapp.com/collections/insta_clone_images';

deleteAllBtn.hide();
parentContainer.hide();

    icon.click(function(e) {
    e.preventDefault();
    parentContainer.slideDown('slow');

    $.get(
        url,
        function(pullData){
            pullData.forEach(function(pullData) {
			var newPhotoReal = '<div >' + '<img src="' + pullData.url + '"><div>' + pullData.caption + '</div>'+'</div>';
			photoReal.append(newPhotoReal);
            });
        }
    );

    imgContainer.show();
    deleteAllBtn.show();

});

//////////////////////////////////////////////////////////////////

cancelBtn.click(function(e) {
    e.preventDefault();
    urlImage = urlImage.val('');
    urlCaption = urlCaption.val('');
    parentContainer.slideUp('slow');
});

//////////////////////////////////////////////////////////////////

addBtn.click(function(e) {
    e.preventDefault();
    var newUrlImage = urlImage.val();
    var newUrlCaption = urlCaption.val();

	    $.post(
	    url,
	    {
	    	url: newUrlImage,
	    	caption: newUrlCaption
	    },
	    function(data) {
	        photoReal.append('<img src="'+data.url+'">' + '<div>'+data.caption+'</div>');
	        photoReal.show();
	    },
	    'json'
	);
});

//////////////////////////////////////////////////////////////////


function onDeleteAll() {
    e.preventDefault();
    $.get(
        url,
        function (data) {
            data.forEach((record) => {
                var newUrl = urlImage + urlCaption + record._id;
                $.ajax({
                    url: newUrl,
                    method: 'DELETE'
                });
                console.log(newUrl);
            });
        },
        'json'
    );
    // urlImage = urlImage.val('');
    // urlCaption = urlCaption.val('');
    // photoReal.html('');
    // imgContainer.hide();
    $deleteAllBtn.click(onDeleteAll);
});








