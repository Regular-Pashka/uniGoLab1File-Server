class Dog {
	static counter = 0; // счетчик экземпляров класса

	constructor(name, breed, owner, age) {
		this.name = name;
		this.breed = breed; // порода
		this.owner = owner;
		this.age = age;
		Dog.counter++;
	}
	bark() {
		console.log(`${this.name} лает!`);
	}
	eat() {
		console.log(`${this.name} ест корм.`);
	}
	explode() {
		console.log(`${this.name} внезапно взорвался!${this.owner.name} приобрёл ПТСР.`)
	}
}

class Owner {
	constructor(name, age) {
		this.name = name;
		this.age = age;
	}
	playWithDog(dog) {
		console.log(`${this.name} кинул кость ${dog.name}у.`);
	}
	feedDog(dog) {
		console.log(`${this.name} накормил ${dog.name}а.`);
	}
}

const dogs = [];

function addDog() {
	const dogQuant = Number(prompt("Enter the dog's quantity to add:"));
	for (let i = 1; i <= dogQuant; i++) {
		const dogName = prompt(`Enter the ${i} dog's name:`);
		const breed = prompt(`Enter the ${i} dog's breed:`);
		const ownerName = prompt(`Enter the ${i} dog's owner name:`);
		const ownerAge = prompt(`Enter the ${i} dog's owner age:`);
		const owner = new Owner(ownerName, ownerAge);
		const dog = new Dog(dogName, breed, owner);
		let listPos;
		listPos = prompt("Where would you like to add dog: position/end?");
			if (listPos === "end") {
				dogs.push(dog);
				console.log("Dog added successfully!");
			} else if (listPos >= 0 && listPos < dogs.length){
				dogs.splice(listPos, 0, dog);
				console.log("Dog added successfully!");
			} else {
				console.log("Invalid index!");
			}
	}
	console.log("Dog added successfully!");
}

// Функция для удаления собаки по индексу
function removeDog() {
	const index = prompt("Enter the index of the dogs to remove or type deleteLastOne to remove last dog:");
	const dogsQuant = Number(prompt("Enter the dog's quantity to remove:"));
	if (index === "deleteLastOne") {
		for (let i = 0; i < dogsQuant; i++) {
			dogs.pop();
		}
		//dogs.pop(-dogsQuant);
		console.log("Dog removed successfully!");
	} else if (index >= 0 && index < dogs.length){
		dogs.splice(index, dogsQuant);
		console.log("Dog removed successfully!");
	} else {
		console.log("Invalid index!");

	}
}

// Функция для изменения информации о собаке по индексу
function updateDog() {
	const index = prompt("Enter the index of the dog to update:");
	if (index >= 0 && index < dogs.length) {
		// const change = prompt("What would you like to change: name/breed/owner/nevermind?");
		let change;
		do {
			change = prompt("What would you like to change: name/breed/owner? If you do not want to change anything type: nevermind");
			if (change == "name") {
				const name = prompt("Enter the new name for a dog:");
				dogs[index].name = name;
			}
			if (change == "breed") {
				const breed = prompt("Enter the new breed for a dog:");	
				dogs[index].breed = breed;
			}
			if (change == "owner") {
				const owner = prompt("Enter the new owner:");
				dogs[index].owner.name = owner;			}
		} while (change !== "nevermind")
		console.log("Dog updated successfully!");
	} else {
		console.log("Invalid index!");
	}
}

// Функция для поиска и вывода информации о собаке по разным полям
function searchDog() {
	const field = prompt("Enter the field to search by (name/breed/owner):");
	const value = prompt(`Enter the ${field} to search for:`);
	const foundDogs = dogs.filter(dog => dog[field] === value || dog[field].name === value);
	if (foundDogs.length > 0) {
		console.log("Found dogs:");
		foundDogs.forEach((dog, index) => {
			console.log(`[${index}] Name: ${dog.name}, Breed: ${dog.breed}, Owner: ${dog.owner.name}`);
		});
	} else {
		console.log("No dogs found!");
	}
}

// Функция для вывода всех собак или определенной собаки по индексу
function displayDogs() {
	const index = prompt("Enter the index of the dog to display (or leave empty to display all):");
	if (dogs.length === 0) {
		console.log("There is no dogs!");
	} else {
		if (index) {
			if (index >= 0 && index < dogs.length) {
				const dog = dogs[index];
				console.log(`Name: ${dog.name}, Breed: ${dog.breed}, Owner: ${dog.owner.name}`);
			} else {
				console.log("Invalid index!");
			}
		} else {
			console.log("All dogs:");
			dogs.forEach((dog, index) => {
				console.log(`[${index}] Name: ${dog.name}, Breed: ${dog.breed}, Owner: ${dog.owner.name}`);
			});
		}
	}

}

// Функция для вывода числа собак в массиве
function displayCount() {
	console.log(`Total dogs: ${dogs.length}`);
}
function main() {
	let choice;
	let filePath, fileChoice;

	do {
		choice = prompt(`Menu:
  1. Add a dog
  2. Remove a dog
  3. Update a dog
  4. Search for a dog
  5. Display dogs
  6. Display count
  7. Dog orders
  8. Owner actions
  9. File actions
  0. Exit
  Enter your choice:`);

		switch (choice) {
			case "1":
				addDog();
				break;
			case "2":
				removeDog();
				break;
			case "3":
				updateDog();
				break;
			case "4":
				searchDog();
				break;
			case "5":
				displayDogs();
				break;
			case "6":
				displayCount();
				break;
			case "7":
				let order = prompt("Order to the dog: bark/eat/explode");
				const index = prompt("Enter the index of the dog to do the order:");
				if (index >= 0 && index < dogs.length) {
					dogs[index][order]();
				} else {
					console.log("Invalid index!");
				}
				break;
			case "8":
				let action = prompt("Owner action: playWithDog/feedDog");
				const ind = prompt("Enter the index of the dog which owner you want to take action:");
				if (ind >= 0 && ind < dogs.length) {
					dogs[ind].owner[action](dogs[ind]);
				} else {
					console.log("Invalid index!");
				}
				break;
			case "9":
				inputFilePath();
				fileChoice = prompt("File Menu:\n1. Read File.\n2. Add dog to file.\n3. Add dog to list from file\n4.Clear File");
				if (fileChoice === "1") {
					requestReadFile();
				} else if (fileChoice === "2") {
					requestAppendFile();
				} else if (fileChoice === "3") {
					// countDogsInFile().then(dogsCount => alert(`There are ${dogsCount} dogs in File`));
					addTextFileContentToList();
				} else if (fileChoice === "4") {
					requestRewriteFile();
				} else {
					alert("Invalid Input");
				}
				break;
			case "0":
				console.log("Exiting...");
				break;
			default:
				console.log("Invalid choice!");
				break;
		}
	} while (choice !== "0");
}
main();


function requestRewriteFile() {
	// if (dogs.length == 0) {
	// 	alert("There's no dog's in the listg!");
	// 	return;
	// }
	const newData = JSON.stringify(dogs);
	fetch('http://localhost:3000/rewriteFile', {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify({info: newData}),
	  })
		.then(response => response.text())
		.then(data => {
		  console.log(data);
		  alert('Данные успешно обновлены!');
		})
		.catch(error => {
		  console.error('Ошибка:', error);
		  alert('Произошла ошибка при обновлении данных');
	});
}

async function requestReadFile(filePath) {
	await fetch('http://localhost:3000/getFileContent')
	.then(response => {
		if (response.ok) {
			return response.text();
		} else {
			throw new Error('Error get');
		}
	}).then(data => {
		console.log('File:', data);
	})
	.catch(error => {
		console.error('Error:', error);
	});
}

function requestAppendFile(filePath) {
	let pos;
	// if (dogs.length == 0) {
	// 	alert("There's no dog's in the list!");
	// 	return;
	// }
	let newData;
		pos = prompt("Which dog you would like to add to file? Input index starting from zero.");
		if (pos == "") {
			newData = JSON.stringify(dogs);
		} else {
			newData = JSON.stringify(dogs[pos]);
		}
		// if (!dogs[pos]) alert('There\'s no such dog in the list');
	fetch('http://localhost:3000/appendDog', {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify({info: newData}),
	  })
		.then(response => response.text())
		.then(data => {
		  console.log(data);
		  alert('Данные успешно обновлены!');
		});
	// 	.catch(error => {
	// 	  console.error('Ошибка:', error);
	// 	  alert('Произошла ошибка при обновлении данных');
	// });
}

async function inputFilePath() {
	let filePath = prompt("Input (absolute)path to file:");
	await fetch('http://localhost:3000/uploadFile', {
		method: 'POST', 
		headers: {
			'Content-type': 'application/json'
		},
        body: JSON.stringify({ filePath: filePath }) // Упаковываем filePath в объект JSON
	})
	.then(response => {
		if (response.ok) {
			console.log(`Путь к файлу успешно обновлен: ${filePath}`);
		} else {
			console.error('Ошибка обновления пути к файлу');
		}
	})
	.catch(error => {
		console.error('Ошибка сети:', error);
	});
}

async function addTextFileContentToList() {
	await fetch('http://localhost:3000/getTextFileContent')
	.then(response => {
		if (response.ok) {
			return response.text();
		} else {
			throw new Error('Error get');
		}
	}).then(data => {
		console.log('File:', data);
		const dogsLines = data.split('\n');
		dogsLines.forEach(dogFromFile => {
			dogs.push(JSON.parse(dogFromFile));
		});
		dogs.forEach((dog, index) => {
			console.log(` [${index}] Name: ${dog.name}, Breed: ${dog.breed}, Owner: ${dog.owner.name}`);
		});
	});
	// .catch(error => {
	// 	console.error('Error:', error);
	// });
}

async function countDogsInFile() {
	try {
		const response = await fetch('http://localhost:3000/countDogsInFile');
		const data = await response.json();
		const dogsCount = data.dogsInFile;
		console.log(`Вот собаки: ${dogsCount}`);
		return dogsCount;
	} catch (error) {
		console.error('Ошибка:', error);
	}
}

function addDogFromFile() {
	fetch('http://localhost:3000/getDogFromFile')
	.then(data => {
		console.log('ALL DOGS Dog: ', data);
	})
	.catch(error => {
		console.error('Error:', error);
	});
}


// // ЗАДАЧИ НА 9 МАЯ:
// ДОДЕЛАТЬ ОТОБРАЖЕНИЕ СЧЕТЧИКА
// 2. СДЕЛАТЬ ВЫБОР КАКУЮ СОБАКУ ДОБАВЛЯТЬ(ПО ПОРЯДКУ)
// 3. РЕАЛИЗОВАТЬ ДОБАВЛЕНИЕ СОБАКИ В СПИСОК

//Перезаписать файл, т.е. предварительно сделать очищение и добавить собак