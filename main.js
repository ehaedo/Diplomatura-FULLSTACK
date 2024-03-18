class Personaje{
    constructor(id,nombre, edad, dinero){    
        this.id = id,   
        this.nombre = nombre
        this.edad = edad
        this.dinero = dinero
        this.inventario = []
        this.mochila = {
            primer_bolsillo: [
            ],
            segundo_bolsillo:[
            ],
            bolsillito_izq: [
            ]
        }
        this.mochila = new Mochila()
    }
    
    recibir(items) {
        if (Array.isArray(items)) {
            this.inventario.push(...items);
            console.log(`Se recibieron ${items.length} items en el inventario`);
        } else {
            console.log("Error: Se esperaba un array de ítems.");
        }
    }
        /* 
        Hacer la logica para eliminar un item por su id
        Recibira un id, buscara por id al elemento dentro del inventario y lo eliminara
        Si no lo encuentra dira console.log("Error ACCION INVALIDA: No existe el item con id {id} dentro del inventario del personaje {nombre}")
        recomnedar
        find inde para el id
        usar splice para eliminarlo
        */
    eliminarItemPorId(id) {
        const index = this.inventario.findIndex(item => item.id === id);
        if (index !== -1) {
            this.inventario.splice(index, 1);
            console.log(`Se eliminó el item con ID ${id} del inventario de ${this.nombre}`);
        } else {
            console.log(`Error: No existe el item con id ${id} dentro del inventario del personaje ${this.nombre}`);
        }
    }    
    /* 
    Crear el metodo
    gastar(dinero_gastado)
    si el dinero gastado es mayor al que tenemos debera decir por consola 'ACCION invalida: Insuficiente dinero'

    Si se puede gastar
    Restar el dinero_gastado al dinero del personaje
    dira 'El personaje {nombre de personaje} ha gastado {dinero gastado} y se queda con {dinero}'
    */
    gastar(dinero_gastado){
        if (this.dinero < dinero_gastado) {
            console.log(`No te alcanza la guita`)
        } else{    
            this.dinero -= dinero_gastado
            console.log(`${this.nombre} gastaste ${dinero_gastado} y se queda ${this.dinero}`)
        }
    }
}

class Item{
    constructor(id,nombre, categoria, nivel, costo)
    {
        this.id = id
        this.nombre = nombre
        this.categoria = categoria
        this.nivel = nivel
        this.costo = costo
    }
}
/*Van a crear una clase nueva llamada Mochila:
Atributos:
primer_bolsillo
segundo_bolsillo
bolsillito_de_izquierda*/
class Mochila{
    constructor() {       
        this.primer_bolsillo = []
        this.segundo_bolsillo = []
        this.bolsillito_de_izquierda = null
    }   
    /*guardarItem(item, tipo_bolsillo)
    Vamos a guardar un item en algunos de nuestros bolsillos (esta definido por el tipo_bolsillo)
    Debemos verificar primero que ese bolsillo no este lleno, por ejemplo
    primer_bolsillo permite hasta 3 items
    segundo_bolsillo permite hasta 2
    bolsillito de la izq permite solo 1
    Si se excede el limite deberá decir por consola 'ERROR: el espacio de la mochila {tipo_bolsillo} esta lleno'*/
    guardarItem(item, tipo_bolsillo) {
        switch (tipo_bolsillo) {
            case 'primer_bolsillo':
                if (this.primer_bolsillo.length < 3) {
                    this.primer_bolsillo.push(item);
                    console.log(`Se guardó el item en el primer bolsillo.`);
                } else {
                    console.log(`ERROR: El espacio del primer bolsillo está lleno.`);
                }
                break;
            case 'segundo_bolsillo':
                if (this.segundo_bolsillo.length < 2) {
                    this.segundo_bolsillo.push(item);
                    console.log(`Se guardó el item en el segundo bolsillo.`);
                } else {
                    console.log(`ERROR: El espacio del segundo bolsillo está lleno.`);
                }
                break;
            case 'bolsillito_de_izquierda':
                if (!this.bolsillito_de_izquierda) {
                    this.bolsillito_de_izquierda = item;
                    console.log(`Se guardó el item en el bolsillito de la izquierda.`);
                } else {
                    console.log(`ERROR: El espacio del bolsillito de la izquierda está lleno.`);
                }
                break;
            default:
                console.log(`ERROR: Tipo de bolsillo no válido.`);
        }
    }
    /*Eliminar Item (id_item, tipo_bolsillo)
    Deberemos verificar si el id_item esta en dicho tipo_bolsillo
    En caso de estar deberemos eliminarlo y retornarlo
    En caso de no estar diremos por consola 'ERROR: El item con id {id_item} no esta en {tipo bolsillo}'*/
    eliminarItem(id_item, tipo_bolsillo) {
        let bolsillo;
        switch (tipo_bolsillo) {
            case 'primer_bolsillo':
                bolsillo = this.primer_bolsillo;
                break;
            case 'segundo_bolsillo':
                bolsillo = this.segundo_bolsillo;
                break;
            case 'bolsillito_de_izquierda':
                if (this.bolsillito_de_izquierda) {
                    if (this.bolsillito_de_izquierda.id === id_item) {
                        const itemEliminado = this.bolsillito_de_izquierda;
                        this.bolsillito_de_izquierda = null;
                        console.log(`Se eliminó el item con ID ${id_item} del bolsillito de la izquierda.`);
                        return itemEliminado;
                    } else {
                        console.log(`ERROR: El item con ID ${id_item} no está en el bolsillito de la izquierda.`);
                        return null;
                    }
                } else {
                    console.log(`ERROR: El bolsillito de la izquierda está vacío.`);
                    return null;
                }
            default:
                console.log(`ERROR: Tipo de bolsillo no válido.`);
                return null;
        }

        const index = bolsillo.findIndex(item => item.id === id_item);
        if (index !== -1) {
            const itemEliminado = bolsillo.splice(index, 1)[0];
            console.log(`Se eliminó el item con ID ${id_item} del ${tipo_bolsillo}.`);
            return itemEliminado;
        } else {
            console.log(`ERROR: El item con ID ${id_item} no está en el ${tipo_bolsillo}.`);
            return null;
        }
    }
}

//Una vez creada la mochila deberá crearse una nueva mochila por cada nuevo personaje
const pepeArgento = new Personaje(1,'pepe Argento', 38, 10000); 
const moniArgento = new Personaje(2, 'Moni Argento', 48, 20000)
const nuevaMochila = new Mochila();

const item_1 = new Item(1, 'Agenda', 'Agendas', 'medio', 5500);
const item_2 = new Item(2, 'Bolsita', 'Cotillon', 'alto', 1000);
const item_3 = new Item(3, 'Banderin', 'Cotillon', 'alto', 1500);
const item_4 = new Item(4, 'Guirnalda', 'Decoracion', 'medio', 3500);
const item_5 = new Item(5, 'Piñata', 'Decoracion', 'alto', 4000);
const item_6 = new Item(6, 'Pochoclera', 'Cotillon', 'bajo', 500);

// pepeArgento.recibir([item_1, item_2, item_3]);

//console.log("Inventario de pepe antes de eliminar:");
//console.log(pepeArgento.inventario);

//pepeArgento.eliminarItemPorId(2); // Elimina el item con ID 2
//console.log("Inventario de pepe despues de eliminar:");
//console.log(pepeArgento.inventario);

//console.log("Agrego el item_2 nuevamente para seguir practicando:");
//pepeArgento.recibir([item_2]);
//console.log("Nuevo inventario: " ,pepeArgento.inventario);

//console.log(pepeArgento.nombre, "tiene ", pepeArgento.dinero)
//console.log("ahora pepe va a gastar $5000 :");
//pepeArgento.gastar(5000);

//console.log(pepeArgento)

//pepeArgento.mochila.guardarItem(item_1, 'primer_bolsillo');
//pepeArgento.mochila.guardarItem(item_2, 'segundo_bolsillo');
//pepeArgento.mochila.guardarItem(item_3, 'bolsillito_de_izquierda');
//pepeArgento.mochila.guardarItem(item_4, 'primer_bolsillo');
//pepeArgento.mochila.guardarItem(item_5, 'segundo_bolsillo');
//pepeArgento.mochila.guardarItem(item_6, 'bolsillito_de_izquierda');
console.log(pepeArgento)
console.log(Mochi)

//console.log("Eliminando item del bolsillito de la izquierda:");
//pepeArgento.mochila.eliminarItem(3, 'bolsillito_de_izquierda');
//console.log("Contenido de la mochila:");
//console.log("Primer bolsillo:");
//pepeArgento.mochila.primer_bolsillo.forEach(item => console.log(item));
//console.log("Segundo bolsillo:");
//pepeArgento.mochila.segundo_bolsillo.forEach(item => console.log(item));
//console.log("Bolsillito de la izquierda:");
//console.log(pepeArgento.mochila.bolsillito_de_izquierda);