const profileSchema = require('../schemas/profileSchema')
module.exports = {
	commands: ['data'],
	expectedArgs: '<digits>',
	permissionError: 'You need more permissions',
	minArgs: 1,
	maxArgs: 1,
	callback: async(message, arguments, text, client, profileData) => {
		const amount = arguments[0];
		message.delete()
		
		const fs = require('fs');
		//read file
		var terms = fs.readFileSync('Output.txt', 'utf8');
		var newValue = "Start -> ";
		fs.writeFileSync('Output.txt', newValue);
	
		
		var Password = "bryxa";
		
		var digits = 0;
		var array = [];
		var array2 = [];
		var array3 = [];
		var array4 = [];
		var array5 = [];
		var array6 = [];
		var array7 = [];
		var array8 = [];
		var array9 = [];
		
		var today = new Date();
		var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
		var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();
		var dateTime = date+' '+time;
		
		for (i = 0; i < 26; i++) {
			var chr = String.fromCharCode(97 + i);
			array.push(chr);
		}		

		
		async function box (){
			
			for (i = 0; i < array.length; i++) {
				array2.push(array[i]);
				
			}
			
			if (amount >= 2 ) {
				for (i = 0; i < array.length; i++) {
					for (j = 0; j < array.length; j++) {
						array3.push(array[i] + array2[j]);
					}
				}
			}
			
			if (amount >= 3 ) {
				for (i = 0; i < array.length; i++) {
					for (k = 0; k < array3.length; k++) {
						array4.push(array2[i] + array3[k]);
					}
				}
			}
			
			if (amount >= 4) {
				for (i = 0; i < array.length; i++) {
						for (k = 0; k < array4.length; k++) {
							array5.push(array2[i] + array4[k]);
						}
				}
			}
			
			if (amount >= 5) {
				for (i = 0; i < array.length; i++) {
						for (k = 0; k < array5.length; k++) {
							array6.push(array2[i] + array5[k]);
						}
				}
			}
			
			
			//error array is too big -> may be able to solve this by storing another way -> Database? (SQL)
			 if (amount >= 6) {
				for (i = 0; i < array.length; i++) {
						for (k = 0; k < array6.length; k++) {
							if(array7.length < 50000000) {
								array7.push(array2[i] + array6[k]);
							} else if (array8.length < 50000000) {
								array8.push(array2[i] + array6[k]);
							} else {
								console.log("OH NO")
								return;
							}
						}
				}
			}
			
			/*if (amount >= 7) {
				for (i = 0; i < array.length; i++) {
						for (k = 0; k < array7.length; k++) {
							array8.push(array2[i] + array7[k]);
						}
				}
			}
			
			if (amount >= 8) {
				for (i = 0; i < array.length; i++) {
						for (k = 0; k < array8.length; k++) {
							array9.push(array2[i] + array8[k]);
						}
				}
			} */
			
			
			
//Keep this in mind -> it may be similar condensed code -> does not work for 4 digits +			
/*
var input = "ad";
var done = false;
var maxLength = 2;
var letterDB = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

function recursion (str) {
   for (var i=0; i < letterDB.length; i++) {
      var test = str+letterDB[i];
      if (test !== input && !done && str.length < maxLength) {
         recursion(test);
      } else if (test === input) {
         done = true;
         alert("your pass is "+test);
      }
   }
}
recursion(""); 
*/
			
			
			
			
		}
		box();
		
		var today2 = new Date();
		var date2 = today2.getFullYear()+'-'+(today2.getMonth()+1)+'-'+today2.getDate();
		var time2 = today2.getHours() + ":" + today2.getMinutes() + ":" + today2.getSeconds() + ":" + today2.getMilliseconds();
		var dateTime2 = date2+' '+time2;
		
		console.log(dateTime + " <<:>> " + dateTime2);
		console.log(array2);
		console.log(array3);
		console.log(array4);
		console.log(array5);
		console.log(array6);
		console.log(array7);
		console.log(array8);
		console.log(array9);
		console.log(array5.includes(Password));
		
		var data = fs.readFileSync('Output.txt', 'utf8');
		var newValue = data + "\n." + array2 + "\n\n" + array3+ "\n\n" + array4 + "\n\n" + array5 + + "\n\n" + array6;
		fs.writeFileSync('Output.txt', newValue);
		
		var data = fs.readFileSync('Output.txt', 'utf8');
		
		function contains(a, obj) {
			for (var i = 0; i < a.length; i++) {
				if (a[i] === obj) {
					console.log(a[i]);
				}
			}
		}
		contains(array6, Password);
	}, 
}