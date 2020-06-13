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