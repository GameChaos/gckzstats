var maps = [''];

var mode = 'kztimer';
var tpRun = 'false';
const unknownImage = 'images/unknown_map.png';

console.log(document.location);

$.getJSON('https://kztimerglobal.com/api/v1.0/records/top?tickrate=128&modes_list=' + mode + '&has_teleports=' + tpRun + '&limit=2', function(data)
{
	$.each(data, function(index, value)
	{
		maps[index] = value;
		console.log(index, value);
	})

	var latestTimesList = document.getElementById("latestTimesList");

	maps.forEach(function(value, index)
	{
		var imgPath = 'images/' + value.map_name + '.jpg';
		if (!imageExists(imgPath))
		{
			imgPath = unknownImage;
		}
		
		latestTimesList.insertAdjacentHTML('afterEnd', '<li class="list-group-item bg-dark"><a href="#" class="image-hyperlink"><img src=' + imgPath + ' class="img-fluid map-thumbnail-small"></a><a href="#" class="hyperlink">' + value.map_name + '</a></li>');
		console.log(index, value.time);
	});
});

function imageExists(path)
{
	$.ajax(
	{
		url:path,
		type:'HEAD',
		error: function()
		{
			console.log('file doesn\'t exist')
			return false;
			//file not exists
		},
		success: function()
		{
			console.log('file exists')
			return true;
			//file exists
		}
	});
}