//V5.0
//ADDED ABILITY TO SELECT NUMBER OF TEAMS.

//V4.0 ADDED SUPPORT FOR SELECTING TEAMS, ALLOW PRINTING, ADD 'use strict' & LINT.
/*TODO:
=ADD MORE STYLING
    =COLUMNS/FLEXBOX
    =ORGANIZE BUTTONS AND STYLE
    =POSITION PRINT BUTTON
*/

//==== RANDOMLY SORT ARRAYS USING FISHER YATES METHOD ATTACHED TO PROTOTYPE ====
    Array.prototype.randomator = function() {
        let i = this.length;
        let j;
        let tempi;
        let tempj;
        if (i === 0) {return false;}
        while(--i){
            j = Math.floor(Math.random() * (i + 1));
            tempi = this[i];
            tempj = this[j];
            this[i] = tempj;
            this[j] = tempi;
        }
        return this;
    }//end randomator

//GET ELEMENTS & CREATE VARS
    var classOut = document.getElementById("classList");
    var countdownOut = document.getElementById("countdownBox");
    var singleDiv = document.getElementById("classSingle");
    var osaatArray;//1 STUDENT AT A TIME ARRAY VAR


//##====#FUNCTION#=INITIALIZE RANDOMIZED STUDENT ARRAY====
    function studentsInit(){
        "use strict";
        var mixedStudentArray = myClass.randomator();
        return mixedStudentArray.slice();
    }//END studentsInit

//##====#FUNCTION#=CLEAR THE DIVS TO RESET THE SCREEN====
    function divReset(){
        "use strict";
        classOut.innerHTML = "";
        countdownOut.innerHTML = "";
        singleDiv.style.display = "none";
    }//END divReset

//##====#FUNCTION#=SHOW PRINT BOX AFTER SELECTION====
    function showPrint(){
        "use strict";
        document.getElementById("print__box").style.display = "block";
        addDate();
    }//END showPrint

//##====#FUNCTION#= ADD DATE TO PRINT PAGE
    function addDate() {
        let timeS = new Date();
        let prettyDate = timeS.toDateString();
        let hh = timeS.getHours();
        let mm = timeS.getMinutes();
        let timeString = hh + ":" + mm;
        document.getElementById("date__box").innerHTML = prettyDate + " | " + timeString;
    }


//############### SHOW STUDENT FUNCTIONS #########
//################################################
//##====#FUNCTION#= SHOW ALL STUDENTS====
    function showStudents(){
        "use strict";
        divReset(); //CLEAR PREVIOUS DATA
        var rndArray = studentsInit();//RANDOMIZE STUDENT ARRAY

        //PRINT OUT RANDOMIZED STUDENT ARRAY
        for (var ia = 0; ia < rndArray.length; ia++) {
            classOut.innerHTML += rndArray[ia] + "<br />";
        }
        showPrint();
    }//END OF showStudents

//====#FUNCTION= SHOW STUDENTS ONE AT A TIME====
    function showOneStudnt(){
        "use strict";
        divReset(); //CLEAR PREVIOUS DATA
        //MAKE NEXT STUDENT DIV VISIBLE
        singleDiv.style.display = "block";
        osaatArray = studentsInit();//INITIALIZE STUDENT ARRAY
        var firstStudent;

        //GET FIRST STUDENT NAME FROM ARRAY
        firstStudent = osaatArray.pop();

        //APPEND A NEW <p> WITH STUDENT NAME AS CHILD TEXT NODE
        var nameText = document.createTextNode(firstStudent);
        var nameP = document.createElement("p");
        nameP.appendChild(nameText);
        countdownOut.appendChild(nameP);

        showPrint();
    }//END OF showOneStudnt()

//##====#FUNCTION#=GET STUDENTS ONE AT A TIME====
    function pickStudent(){
        "use strict";
        //GET NEXT STUDENT FROM REMAINING ARRAY
        var nextStudent;
        if (osaatArray.length > 0) {
            if (osaatArray.length === 1) {
                nextStudent = osaatArray.pop() + " (Last student)";
            } else {
                nextStudent = osaatArray.pop();
            }
        } else {
            nextStudent = "No more students.";
        }

        //CREATE NEW PARAGRAPH NODE WITH NEXT STUDENT
        var newStudent = document.createTextNode(nextStudent);
        var newPara = document.createElement("p");
        newPara.appendChild(newStudent);

        //INSERT NEW STUDENT BEFORE PREVIOUS ONE
        var allPara = countdownOut.getElementsByTagName("p");
        var lastPara = allPara.item(0);
        countdownOut.insertBefore(newPara, lastPara);

        showPrint();
    }//END OF pickStudent()

//##====#FUNCTION#= CREATE PARTNERS====
    function getPairs(){
        "use strict";
        divReset(); //CLEAR PREVIOUS DATA
        var rndPairsArray = studentsInit();//RANDOMIZE STUDENT ARRAY

        //PRINT OUT RANDOMIZED STUDENT PARTNERS
        while (rndPairsArray.length > 1) {
            var partner1 = rndPairsArray.pop();
            var partner2 = rndPairsArray.pop();

            //OUTPUT STUDENT PAIR
            classOut.innerHTML += partner1 + " <==> " + partner2 + "<br />";
        }
        //OUTPUT ODD STUDENT PAIRED WITH INSTRUCTOR IF REQUIRED
        if(rndPairsArray.length == 1){
            var partnerX = rndPairsArray.pop();
            classOut.innerHTML += partnerX + " <==> Instructor";
        }

        showPrint();
    }//END OF getPairs()

//##====#FUNCTION#=ORDER TEAMS====
    function orderTeams(){
        "use strict";
        divReset(); //CLEAR PREVIOUS DATA
        var teamsList = ["Team 1","Team 2","Team 3","Team 4","Team 5","Team 6","Team 7","Team 8"];
        var rndTeamsArray = teamsList.randomator();//USE PROTOTYPE TO RANDOMIZE ARRAY
        //PRINT OUT RANDOMIZED TEAM ARRAY
        for (var ie = 0; ie < rndTeamsArray.length; ie++){
            classOut.innerHTML += rndTeamsArray[ie] + "<br />";
        }

        showPrint();
    }//END OF orderTeams

//##====#FUNCTION#=GET TEAMS BY SIZE OF TEAM====
    function getTeamsBySize(evObj){
        "use strict";
        divReset(); //CLEAR PREVIOUS DATA
        var rndTeamsArray = studentsInit();//RANDOMIZE STUDENT ARRAY
        var teamsListOut = "";
        var teamCounter = 1;
        var numOfMmbrs = document.getElementById("slct__teamsOf").value;

        while(rndTeamsArray.length > 1) {
            teamsListOut += "<div><h2>Team " + teamCounter + "</h2>";
            teamCounter++;

            //Create List of Team Members
            teamsListOut += "<ul class='teams__list'>";
            for (let i = 0; i < numOfMmbrs; i++) {
                let thisMember = rndTeamsArray.pop();

                if (thisMember === undefined) {
                    teamsListOut += "<li><em>No students remaining</em></li>";
                    break;
                } else {
                    teamsListOut += "<li>" + thisMember + "</li>";
                }
            }//end for loop team builder
            teamsListOut += "</ul></div>";

        }//end while loop
        classOut.innerHTML = teamsListOut;

        showPrint();
    }//end getTeamsBySize
	

//##====#FUNCTION#=GET SELECTED NUMBER OF TEAMS====
    function getSetNumberOfTeams(evObj){
        "use strict";
        divReset(); //CLEAR PREVIOUS DATA
        var rndTeamsArray = studentsInit();//RANDOMIZE STUDENT ARRAY
        var teamsListOut = "";
        var teamCounter = 1;//Team number.
        var numOfTeams = document.getElementById("slct__teams").value;
		const eachTeam = parseInt(rndTeamsArray.length / numOfTeams);
		let leftOvers = rndTeamsArray.length % numOfTeams;
//console.log(numOfTeams + " = " + parseInt(eachTeam) + " with " + leftOvers + " left over");		
		for (let i = 0; i < numOfTeams; i++){
			//SET TEAM NUMBER
			teamsListOut += "<div><h2>Team " + teamCounter + "</h2>";
            teamCounter++;
			teamsListOut += "<ul class='teams__list'>";
			//CREATE TEAM MEMBERS			
			for(let i = 0; i < eachTeam; i++){
				let thisMember = rndTeamsArray.pop();
				if (thisMember === undefined) {
                    teamsListOut += "<li><em>No students remaining</em></li>";
                    break;
                } else {
                    teamsListOut += "<li>" + thisMember + "</li>";
                }
			}
			//IF NOT DIVISIBLE EVENLY, ADD AN EXTRA TEAM MEMBER.
			if(leftOvers > 0){
				let extraMember = rndTeamsArray.pop();
				teamsListOut += "<li>" + extraMember + "</li>";
				leftOvers--;
			}
			teamsListOut += "</ul></div>";			
		}
        classOut.innerHTML = teamsListOut;

        showPrint();
    }//end getSetNumberOfTeams
	
//====SETUP ONCLICK LISTENERS
    document.getElementById("buttons__all").onclick = showStudents;//ALL STUDENTS
    document.getElementById("buttons__one").onclick = showOneStudnt;//1 STUDENT @ A TIME
    document.getElementById("buttons__pairs").onclick = getPairs;//PARTNERS
    document.getElementById("buttons__groups").onclick = orderTeams;//ALL GROUPS
    document.getElementById("buttons__next").onclick = pickStudent;//PICK NEXT SINGLE STUDENT
	//PICK TEAMS BY # OF TEAM MEMBERS
    document.getElementById("slct__teamsOf").onchange = getTeamsBySize;
	//PICK TEAMS BY # OF TEAMS
    document.getElementById("slct__teams").onchange = getSetNumberOfTeams;
    document.getElementById("print__btn").onclick = function(){window.print();};