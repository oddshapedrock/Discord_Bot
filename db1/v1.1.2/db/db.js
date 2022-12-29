const fs = require('fs');
const path = require("path");

const dir = ('./collections');
/*
Returns a list of all the files in the collections folder.
This can be used when calling other functions to see if the file exists.
USE AS A DEVELOPER TOOL NOT A FEATURE
*/
let fileList = [];
const getAllFiles = (fileName) => {
	const files = fs.readdirSync(path.join(__dirname, dir));
	for (const file of files) {
		if (fs.statSync(path.join(__dirname, dir, file)).isDirectory()) {
			getAllFiles(path.join(dir, file));
		} else {
			if (fileList.indexOf(file) === -1) { fileList.push(file); }
			if (file == fileName) {
				return require(path.join(__dirname, dir, file));
			}
		}
	}
	return fileList;
};

/*
Takes the data of the existing file, and saves it to the given location.
Used to keep data upon restart of server.
NOT TO BE USED OUTSIDE db.js
*/
const save = (file, loc) => {
	let objectToString = (JSON.stringify(file).replace(/,/g, ',\n'));
	objectToString = objectToString.replace(/{/g, '{\n');
	objectToString = objectToString.replace(/}/g, '\n}');
	fs.writeFileSync(path.join(__dirname, loc), "module.exports = \n" + objectToString, function(err) {
		if (err) {
			return console.error(err);
		}
	})
}

/*
Finds the given property in the provided files data.
If bool = true this will return the index(s) of the property.
if bool = false this will return each object mathing the property.
USE WITH CAUTION, MAY RETURN MULTIPLE VALUES
ALWAYS RETURNS AN ARRAY
*/
const find = (file, property, bool) => {
	let list = [];
	for (i = 0; i < Object.entries(property).length; i++) {
		var results = file.map(function(temp) {
			if (temp[Object.keys(property)[i]] == Object.values(property)[i]) {
				if (i < 1) {
					if (list.indexOf(temp) === -1) {
						if (!bool) {
							list.push(temp);
						} else {
							list.push(file.indexOf(temp))
						}
					}
				}
			} else if (list.indexOf(temp) > -1 || list.indexOf(file.indexOf(temp)) > -1) {
				if (!bool) {
					list.splice(list.indexOf(temp), 1);
				} else {
					list.splice(list.indexOf(file.indexOf(temp)), 1);
				}
			}
		});
	}
	if (list.length) {
		return list;
	} else {
		return undefined;
	}
}

/*
Pushes the given property into the files data then saves the file to the given location.
WARNING: IF GIVEN LOCATION DOES NOT EXIST OR IS NOT A FILE MEANT TO STORE DATA
			   THIS MAY DELETE/REPLACE THE EXISTING FILE.
*/
const add = (file, loc, property) => {
	if (find(file, property) == undefined) {
		file.push(property);
			save(file, loc);
	} else {
	 	return console.error("Duplicate found: no need for duplicate data!")
	}
}

/*
Finds the provided property in a file then edits the property with the new information.
Saves the data to the provided location.
If bool = true this will edit each property found
If bool = false this will only edit the property if only 1 is Found
WARNING: IF GIVEN LOCATION DOES NOT EXIST OR IS NOT A FILE MEANT TO STORE DATA
			   THIS MAY DELETE/REPLACE THE EXISTING FILE.
*/
const edit = (file, loc, property, change, bool) => {
	list = find(file, property, true);
	if (list !== undefined) {
		if (list.length > 1 && bool === true) {
			for (i = 0; i < list.length; i++) {
				Object.assign(file[list[i]], change);
			}
			save(file, loc);
		} else if (list.length == 1) {
			Object.assign(file[list], change);
			save(file, loc);
		} else if (list.length > 1) {
			console.log(`Found more than one instance of "${JSON.stringify(property)}"! Either change the data or use boolean true.`);
		}
	}
}

/*
Finds and deletes the property from the data, and saves to the provided location.
if bool = true this will delete  each property Found
if bool = false this will only delete the property if only 1 is Found
WARNING: IF GIVEN LOCATION DOES NOT EXIST OR IS NOT A FILE MEANT TO STORE DATA
			   THIS MAY DELETE/REPLACE THE EXISTING FILE.
*/
const remove = (file, loc, property, bool) => {
	list = find(file, property, true);
	if (list !== undefined) {
		list.reverse();
		if (list.length > 1 && bool === true) {
			for (i = 0; i < list.length; i++) {
				file.splice(list[i], 1);
			}
			save(file, loc);
		} else if (list.length == 1) {
			file.splice(list, 1);
			save(file, loc);
		} else if (list.length > 1) {
			console.log(`Found more than one instance of "${JSON.stringify(property)}"! Either change the data or use boolean true.`);
		}
	}
}

module.exports = {
	getAllFiles,
	find,
	add,
	edit,
	remove
};
