var inputContainer = $('.inputContainer');
var icon = $('.glyphicon-plus-sign');
var addBtn = $('.addBtn');
var cancelBtn = $('.cancelBtn');
var urlImage = $('.urlImage');
var urlCaption = $('.urlCaption');
var photoReal = $('.photoReal');
var imgContainer = $('.imgContainer');
var deleteAllBtn = $('.deleteAllBtn');
var url = 'http://small-tiyfe.herokuapp.com/collections/insta_clone_images/';

deleteAllBtn.hide();
inputContainer.hide();

    icon.click((e) => {
    e.preventDefault();
    inputContainer.slideDown('fast');

    $.get(
        url,
        function(pullData){
            pullData.forEach((pullData) => {
			var newPhotoReal = '<div >' + '<img src="' + pullData.url + '"><div>' + pullData.caption + '</div>'+'</div>';
			photoReal.append(newPhotoReal);
            });
        }
    );
    urlImage = urlImage.val('');
    urlCaption = urlCaption.val('');
});

//////////////////////////////////////////////////////////////////

cancelBtn.click(function(e) {
    e.preventDefault();
    urlImage = urlImage.val('');
    urlCaption = urlCaption.val('');
    inputContainer.slideUp('fast');
});

//////////////////////////////////////////////////////////////////

addBtn.click((e) => {
    e.preventDefault();
    imgContainer.show();
    deleteAllBtn.show();
    var newUrlImage = urlImage.val();
    var newUrlCaption = urlCaption.val();

	    $.post(
	    url,
	    {
	    	url: newUrlImage,
	    	caption: newUrlCaption
	    },
	    function(data) {
	        photoReal.append('<img class="srcAndCaption" src="'+data.url+'">' + '<div class="srcAndCaption">'+data.caption+'</div>');
	        photoReal.show();
	    },
	    'json'
	);

    if(empty(urlImage.val && urlCaption.val)) {
        return false;
    }
    if(false) {
        photoReal.html('');
    }
    else {
        return true;
    }

    urlImage = urlImage.val('');
    urlCaption = urlCaption.val('');
});

//////////////////////////////////////////////////////////////////


function onDeleteAll(e) {
    e.preventDefault();
    $.get(
        url,
        function (data) {
            data.forEach((record) => {
                var newUrl = url + record._id;
                $.ajax({
                    url: newUrl,
                    method: 'DELETE'
                });
                console.log(newUrl);
            });
        },
        'json'
    );
    urlImage = urlImage.val('');
    urlCaption = urlCaption.val('');
};
deleteAllBtn.click(onDeleteAll);

deleteAllBtn.click(function(){
    setTimeout(function () {
    window.location.reload();
    }, 500);
});





