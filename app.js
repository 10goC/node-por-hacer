const argv = require('./config/yargs').argv;
const colors = require('colors');
const porHacer = require('./todo/todo');

let comando = argv._[0];

switch (comando) {
	case 'crear':
		let tarea = porHacer.crear(argv.descripcion);
		console.log(tarea);
		break;
	case 'listar':
		let listado = porHacer.getListado();
		console.log('==================='.gray);
		console.log('===='.gray + ' Por hacer ' + '===='.gray);
		console.log('==================='.gray);
		for (let tarea of listado) {
			console.log(tarea.descripcion.toUpperCase().cyan);
			console.log('Estado: ', tarea.completado ? '√'.green : 'X'.red);
			console.log('==================='.gray);
		}
		break;
	case 'actualizar':
		let success = porHacer.actualizar(argv.descripcion, argv.completado);
		if (!success) {
			console.log('No actualizado');
		}
		break;
	case 'borrar':
		let borrado = porHacer.borrar(argv.descripcion);
		console.log(borrado ? 'Éxito' : 'Fail');
		break;
	default:
		console.log('Comando no reconocido');
}