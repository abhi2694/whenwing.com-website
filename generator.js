/* ============================= GENERATOR ===============================*/
var profs = [
    "Carpenter",
    "Painter",
    "Plumber",
    "Electrician",
    "Glass and Mirror",
    "Architect",
    "Builder",
    "Interior Design",
    "Internet Provider",
    "Laundry",
    "Pundit and Puja",
    "Photographer",
    "Web Developer",
    "Concrete Provider",
    "CCTV Camera",
    "AC Repair",
    "Refrigerator",
    "Washing Machine",
    "RO Repair",
    "Microwave",
    "TV Repair",
    "Geyser",
    "Computer",
    "Mobile",
    "Cook",
    "Driver",
    "Yoga Trainer",
    "Dietician",
    "Naukar",
    "Security Guard",
    "Dancer",
    "Gardener",
    "DJ",
    "Wedding Planner",
    "Party Planner",
    "Event Photographer",
    "Bridal Makeup / Artist",
    "Hairstyle / Makeup",
    "Party Caterer",
    "Wedding Caterer",
    "Wedding Decorator",
    "Farmhouse",
    "Halwai",
    "Tent / Decorator",
    "Mehandi Artist",
    "Band",
    "Ghodi and Baggi",
    "Flower and Jhumar",
    "Light Set",
    "Palki and Atishbaazi",
    "Waiter Service",
    "Video Cameraman"
]

var names = ['John Doe', 'Jane Doe', 'David Brooke', 'Sam Miller', 'Mark Williams']
var specs = ['repair', 'install', 'others']
var none = "NONE"

var random 	= (a, b) => { return a + Math.floor(Math.random() * (b - a + 1)); }
var phone 	= () => { return random(7000000000, 9000000000).toString(); }
var age 	= () => { return random(20, 60).toString(); }
var qStr 	= (s) => { return "'" + s + "'" }

var formatList = (l) => {
	var res = l[0];
	for (var i = 1; i < l.length; i++)
		res += ", " + l[i];
	return res;
}

var generate = () => {
	var price = random(500, 10000); 
	var l = [
		names[random(0, names.length - 1)],
		profs[random(0, profs.length - 1)],
		specs[random(0, specs.length - 1)],
		price.toString(),
		phone(),
		age(),
		none,	/* address */
		none,	/* about   */
		none,	/* workexp */
		none,	/* record */
		none,	/* reg date */
		none,	/* photo_id */
		"1"
	];
	l.forEach((x, i) => {
		l[i] = qStr(x);
	})
	var str = "(" + formatList(l) + ")";
	return str;
}

var genMulti = (x) => {
	var l = []
	while(l.length < x) l.push(generate())
	l = formatList(l)
	return l;
}
module.exports = genMulti;