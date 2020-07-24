const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {
	let data = JSON.stringify(listadoPorHacer);

	fs.writeFile('db/por-hacer.json', data, (err) => {
		if (err) {
			throw new Error('Error escribiendo archivo', err);
		} else {
			console.log('Archivo guardado');
		}
	});
};

const cargarDB = () => {
	try {
		listadoPorHacer = require('../db/por-hacer.json');
	} catch (error) {
		listadoPorHacer = [];
	}
};

const crear = (descripcion) => {
	cargarDB();

	let porHacer = {
		descripcion,
		completado: false
	};

	listadoPorHacer.push(porHacer);

	guardarDB();

	return porHacer;
}

const getListado = () => {
	cargarDB();
	return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
	cargarDB();
	let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
	if (index >= 0) {
		listadoPorHacer[index].completado = completado;
		guardarDB();
		return true;
	}
	return false;
}

const borrar = descripcion => {
	cargarDB();
	let antes = listadoPorHacer.length;
	listadoPorHacer = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);
	if (listadoPorHacer.length < antes) {
		guardarDB();
		return true;
	}
	return false;
}

module.exports = {
	crear,
	getListado,
	actualizar,
	borrar
}