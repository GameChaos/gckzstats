/**
 * Get the URL parameters
 * source: https://css-tricks.com/snippets/javascript/get-url-variables/
 * @param  {String} url The URL
 * @return {Object}     The URL parameters
 */
function GetParams(url)
{
	let params = {}
	let parser = document.createElement("a")
	parser.href = url
	let query = parser.search.substring(1)
	let vars = query.split('&')
	for (let i = 0; i < vars.length; i++)
	{
		let pair = vars[i].split('=')
		params[pair[0]] = decodeURIComponent(pair[1])
	}
	return params;
};

function FormatTime(fTime)
{
	var roundedTime = Math.floor(fTime)
	var hours = Math.floor(roundedTime / 3600)
	var minutes = Math.floor(roundedTime / 60 - hours * 60)
	var seconds = Math.floor(roundedTime - hours * 3600 - minutes * 60)
	var centiseconds = Math.floor((parseFloat(fTime) - roundedTime) * 100)

	var timeString = ""
	
	function padTime(string, time)
	{
		if (time < 10)
		{
			string = `${string}0`
		}
		return string;
	}
	
	if (hours != 0)
	{
		timeString += `${hours}:`
	}
	timeString += minutes < 10 ? `0${minutes}:` : `${minutes}:`
	timeString += seconds < 10 ? `0${seconds}.` : `${seconds}.`
	timeString += centiseconds < 10 ? `0${centiseconds}` : `${centiseconds}`

	return timeString;
}

function GetModeID(modeString)
{
	switch (modeString) {
		case "kz_timer":
			return 200;
			break;
		case "kz_simple":
			return 201;
			break;
		case "kz_vanilla":
			return 202;
			break;
		default:
			return -1;
			break;
	}
}

function GetModeName(modeID)
{
	switch (modeID) {
		case 200:
			return "kz_timer";
			break;
		case 201:
			return "kz_simple";
			break;
		case 202:
			return "kz_vanilla";
			break;
		default:
			return -1;
			break;
	}
}

// only works if an element with that id exists with the correct footprint
function GetRunType()
{
	var runType = document.getElementById("tpRun-dropdown")
	return runType.options[runType.selectedIndex].value
}

function GetRunMode()
{
	var mode = document.getElementById("mode-dropdown")
	return mode.options[mode.selectedIndex].value
}

function GetRunTypePretty()
{
	var runType = document.getElementById("tpRun-dropdown")
	return runType.options[runType.selectedIndex].text
}

function GetRunModePretty()
{
	var mode = document.getElementById("mode-dropdown")
	return mode.options[mode.selectedIndex].text
}

function RemoveAllChildrenFromNode(node)
{
	while (node.lastChild)
	{
		node.removeChild(node.lastChild);
	}
	return node;
}

// creates a html string that contains a hyperlink to profile.html with the player's steam id.
// example: "<a href=profile.html?steamid=STEAM_1:0:102468802>GameChaos</a>"
function CreatePlayerProfileLink(steamID, playerName)
{
	return "<a href=profile.html?steamid=" + steamID + ">" + playerName + "</a>"
}