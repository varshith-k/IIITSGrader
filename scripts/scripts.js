var calculateGrade = document.getElementById('calculate-grade'),
	addCourseForm = document.getElementById('add-course-form'),
	addCourseBtn = document.getElementById('add-course-btn'),
	gradeTable = document.getElementById('grade-table'),
	outputPane = document.getElementById('output-pane');

function setOutput(cgpa, fail) {
	outputPane.innerHTML = "";
	if (fail) outputPane.innerHTML = "Everything will be alright 🦸. Prepare for supplies ! <br>";
	outputPane.innerHTML += "Your Final grade for this Semester is: ";
	outputPane.innerHTML += "<span id='final-grade'>" + cgpa + "</span>";
}

function validateInput(grade, credits) {
	if (grade <= 0 || credits <= 0) return "Both grade and credit must be positive";
	if (grade > 10) return "Invalid Grade. It must be less than 10 Unless you are a superhuman.";
	return "";
}

addCourseBtn.addEventListener('click', function (e) {
	e.preventDefault();
	var grade = addCourseForm.grade.value,
		credits = addCourseForm.credits.value;

	if (!grade || !credits) { alert('Enter both credit and grade'); return; }

	if (validateInput(grade, credits) != "") {
		alert(validateInput(grade, credits));
		return;
	}

	var tableRow = document.createElement('tr'), gradeTd = document.createElement('td');
	gradeTd.innerHTML = grade;
	var creditsTd = document.createElement('td');
	creditsTd.innerHTML = credits;
	tableRow.appendChild(creditsTd);
	tableRow.appendChild(gradeTd);

	gradeTable.appendChild(tableRow);
	calculateGradeFunc();
});

function calculateGradeFunc() {
	var creditWeight = 0,
		creditsSum = 0,
		fail = false,
		trs = Array.from(gradeTable.querySelectorAll('tr'));
	trs.splice(0, 1);
	for (var i = 0; i < trs.length; ++i) {
		var tds = Array.from(trs[i].querySelectorAll('td')),
			credits = tds[0].innerHTML,
			grade = tds[1].innerHTML;
		creditWeight += (credits * grade);
		creditsSum += parseInt(credits);
		if (grade < 5) fail = true;
	}

	if ((creditWeight == 0 || creditsSum == 0) && (!fail)) { alert('please enter valid grades !'); return; }

	var cgpa = creditWeight / creditsSum;
	setOutput(cgpa, fail);
}