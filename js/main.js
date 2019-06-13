// style stuff
const bgColour = 'bg-dark';

// general stuff
var mode = 'kz_timer';
var runType = ['Pro', 'TP'];
var tpRun = 'false';
var currentPage = 'Home';
const imgMissingMap = 'images/unknown_map.png';

// home page vars

// how many times per page on latest times
const latestTimesCount = 6;

const latestTimesPageCount = 16;

// current page on latestTimes
var latestTimesCurrentPage = 0;

// node object used for copying template to
var pageLatestTimes = null;

// maps page vars
var maps = [];

// node object used for copying template to
var pageMaps = null;

// initialisation
showLatestTimes();
updateLatestTimes();

// =================
// general functions
// =================

function resetNavbar()
{
	var elements = document.getElementsByClassName('main-navbar nav-item active');

	while(elements[0])
	{
		elements[0].classList.remove('active');
	}
}

function removeAllChildrenFromNode(node)
{
	while (node.lastChild)
	{
		node.removeChild(node.lastChild);
	}
	return node;
}

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

// ==================================
// latest times (home) page functions
// ==================================

function showLatestTimes()
{
	var bodyContainer = document.getElementById("body-container");

	var temp = document.getElementById("templateLatestTimes");
	var clone = temp.content.cloneNode(true);
	bodyContainer.appendChild(clone);
	pageLatestTimes = document.getElementById("latestTimes");
}

function updateLatestTimes()
{
	var offset = latestTimesCurrentPage * latestTimesCount;
	$.getJSON('https://kztimerglobal.com/api/v1.0/records/top/recent?has_teleports=' + tpRun + '&tickrate=128&stage=0&modes_list_string=' + mode + '&place_top_at_least=1&offset=' + offset + '&limit=6', function (data)
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
			<li class="list-group-item ' + bgColour + '">\
				<a href="index.html/maps/' + value.map_name + '" class="image-hyperlink map-link">\
					<img src="' + imgPath + '" class="img-fluid map-thumbnail-small" onerror="onImgError(this)">\
				</a>\
				<p style="display: inline-block">\
					<a href="#" class="hyperlink map-link">' + value.map_name + '</a> (' + formatTime(value.time) + ')<br>\
					by <a href="#" class="hyperlink">' + value.player_name + '</a>\
				</p>\
			</li>');
		});
	});
}

$('#latestTimesPageButtons').twbsPagination({
	totalPages: latestTimesPageCount,
	visiblePages: 3,
	onPageClick: function (event, page)
	{
		latestTimesCurrentPage = page - 1;
		updateLatestTimes();
	}
});

$("#tpRun-dropdown a.dropdown-item").click(function()
{
	$("#runtype-dropdown").html($(this).text());

	if ($(this).text() === runType[1])
	{
		if (tpRun != 'true')
		{
			tpRun = 'true';
			updateLatestTimes();
		}
	}
	else if (tpRun != 'false')
	{
		tpRun = 'false';
		updateLatestTimes();
	}
});

// maps page
$(".nav-item").click(function()
{
	var text = $(this).find('a').text();
	resetNavbar();

	$(this).addClass('active');

	console.log(text);
	if (text == 'Home' && currentPage != 'Home')
	{
		if (pageLatestTimes != null) pageLatestTimes.remove();
		if (pageMaps != null) pageMaps.remove();

		currentPage = 'Home';

		showLatestTimes();
		updateLatestTimes();
	}
	
	if (text == 'Maps' && currentPage != 'Maps')
	{
		if (pageLatestTimes != null) pageLatestTimes.remove();
		if (pageMaps != null) pageMaps.remove();

		currentPage = 'Maps';

		showMaps();
	}
});

function showMaps()
{
	var bodyContainer = document.getElementById("body-container");

	var temp = document.getElementById("templateMaps");
	var clone = temp.content.cloneNode(true);
	bodyContainer.appendChild(clone);

	pageMaps = document.getElementById("maps");
}