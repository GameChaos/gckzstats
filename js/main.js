

var mode = 'kz_timer';
var runType = ['Pro', 'TP'];
var tpRun = 'false';
const imgMissingMap = 'images/unknown_map.png';

function LoadLatestTimes()
{
	$.getJSON('https://kztimerglobal.com/api/v1.0/records/top/recent?has_teleports=' + tpRun + '&tickrate=128&stage=0&modes_list_string=' + mode + '&place_top_at_least=1&limit=6', function (data)
	{
		var maps = [];
		$.each(data, function (index, value)
		{
			maps[index] = value;
		})

		var latestTimesList = document.getElementById("latestTimesList");
		latestTimesList = removeAllChildrenFromNode(latestTimesList);

		maps.forEach(function (value, index)
		{
			var imgPath = 'images/' + value.map_name + '.jpg';
			$('#latestTimesList').append('\
			<li class="list-group-item bg-dark">\
				<a href="#" class="image-hyperlink">\
					<img src="' + imgPath + '" class="img-fluid map-thumbnail-small" onerror="onImgError(this)">\
				</a>\
				<p style="display: inline-block">\
					<a href="#" class="hyperlink">' + value.map_name + '</a>\
					(' + formatTime(value.time) + ')<br>\
					by <a href="#" class="hyperlink">' + value.player_name + '</a>\
				</p>\
			</li>');
		});
	});
}

function removeAllChildrenFromNode(node)
{
	/*var shell;
	// do not copy the contents
	shell = node.cloneNode(false);
  
	if (node.parentNode)
	{
		node.parentNode.replaceChild(shell, node);
	}
  
	return shell;*/
	while (node.lastChild)
	{
		node.removeChild(node.lastChild);
	}
	return node;
  }

LoadLatestTimes();

$(".dropdown-menu a").click(function()
{
	$("#runtype-dropdown").html($(this).text());

	if ($(this).text() === runType[1])
	{
		if (tpRun != 'true')
		{
			tpRun = 'true';
			LoadLatestTimes();
		}
	}
	else
	{
		if (tpRun != 'false')
		{
			tpRun = 'false';
			LoadLatestTimes();
		}
	}
});

function onImgError(image)
{
    image.onerror = "";
    image.src = imgMissingMap;
    return true;
}

function formatTime(fTime)
{
	var roundedTime = Math.floor(fTime);
	var hours = Math.floor(roundedTime / 3600);
	var minutes = Math.floor(roundedTime / 60 - hours * 60);
	var seconds = Math.floor(roundedTime - hours * 3600 - minutes * 60);
	var centiseconds = Math.floor((parseFloat(fTime) - roundedTime) * 100);

	var time = "";
	if (hours != 0)
	{
		time = padTime(time, hours) + `${hours}:`;
	}
	if (minutes != 0)
	{
		time = padTime(time, minutes) + `${minutes}:`;
	}

	time = padTime(time, seconds) + `${seconds}.${centiseconds}`

	return time;
}

function padTime(string, time)
{
	if (time < 10)
	{
		string = `${string}0`;
	}
	return string;
}