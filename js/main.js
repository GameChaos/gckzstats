var maps = [''];

var mode = 'kztimer';
var tpRun = 'false';

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
		imageExists('images/' + value.map_name + '.jpg');
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
			//file not exists
		},
		success: function()
		{
			console.log('file exists')
			//file exists
		}
	});
}