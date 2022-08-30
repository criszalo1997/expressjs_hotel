'use strict';
const { use } = require('../routes/habitacion.routes');
var dbConn = require('./../../config/db.config');

//Reserva object create
var Reserva = function (reserva) {
    this.fechaini = reserva.fechaini;
    this.fechafin = reserva.fechafin;
    this.met_pago = reserva.met_pago;
    this.estado = reserva.estado;
    this.pago = reserva.pago;
    this.habitacion_id = reserva.habitacion_id;
    this.cliente_id = reserva.cliente_id;

    this.created_at = new Date();
    this.updated_at = new Date();
};

Reserva.create = async function (newRes, result) {

    var disp_hab = await this.verifyRoom(newRes.habitacion_id, newRes.fechaini, newRes.fechafin, (err, reserva) => { return reserva });
    console.log(newRes.pago);
    console.log(disp_hab.precio);
    if (disp_hab.precio != null && (newRes.pago > disp_hab.precio)) {
        result("error pago añadido superior al precio de la habitacion", null);
    } else if (disp_hab.es_reservable == true) {
        dbConn.query("INSERT IGNORE INTO reservaciones set ?", newRes, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                console.log(res.insertId);
                result(null, res.insertId);
            }
        });
    }else{
        result(null, null);
    }
    
};

Reserva.verifyRoom = function(id, new_start, new_end, result){
    var id_habitacion = id
    return new Promise(function(resolve, reject){
        dbConn.query(`SELECT reservaciones.id reserva, reservaciones.estado reserva_estado, habitaciones.id habitacion, habitaciones.precio precio FROM reservaciones 
        left join habitaciones on reservaciones.habitacion_id = habitaciones.id 
        where (? BETWEEN reservaciones.fechaini and reservaciones.fechafin 
        OR (reservaciones.fechaini BETWEEN ? AND ? OR 
        reservaciones.fechafin BETWEEN ? AND ? OR
        ? BETWEEN reservaciones.fechaini AND reservaciones.fechafin)) and habitaciones.id =  ?`, [new Date(),new_start,new_end,new_start,new_end,new_start,id_habitacion], function (err, res) {
            if (err) {
            console.log("error: ", err);
            reject(result(err, null));
        }
        else {
            var response;
            console.log(res);
            if (res.length > 0) {
                response = {
                    habitacion: res[0]['habitacion'], 
                    reserva: res[0]['reserva'],
                    reserva_estado: res[0]['reserva_estado'],
                    precio : res[0]['precio'],
                    es_reservable: false
                }
            }else{
                response = {
                    habitacion: id, 
                    precio: null, 
                    reserva: null,
                    reserva_estado: null,
                    es_reservable: true
                }
            }
            resolve(result(null, response));
        }
    });
    }
  )}




Reserva.findById = function (id, result) {
    dbConn.query("Select * from reservaciones where id = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

Reserva.findAll = function (result) {
    dbConn.query("Select reservaciones.*, clientes.nombre as cliente  from reservaciones join clientes on reservaciones.cliente_id = clientes.id ", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('reservaciones : ', res);
            result(null, res);
        }
    });
};

Reserva.update = function (id, reserva, result) {
    dbConn.query("UPDATE reservaciones SET fechaini=?, fechafin=?, met_pago=?, estado=?, pago=?, habitacion_id=?, cliente_id=?, updated_at=? WHERE id = ?",
        [reserva.fechaini, reserva.fechafin, reserva.met_pago, reserva.estado, reserva.pago, reserva.habitacion_id, reserva.cliente_id, new Date(), id],
        function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                result(null, res);
            }
        });
};

Reserva.to_pay = function (id, reserva, result) {

    var reserva;

    Reserva.findById(req.params.id, function (err, m_reser) {
        if (err)
            console.log(err);
        reserva = m_reser;
    });

    console.log(reserva);

    dbConn.query("UPDATE reservaciones SET pago=?, updated_at=? WHERE id = ?",
        [reserva.pago, new Date(), id],
        function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                result(null, res);
            }
        });
};


Reserva.delete = function (id, result) {
    dbConn.query("DELETE FROM reservaciones WHERE ? NOT BETWEEN reservaciones.fechaini and reservaciones.fechafin AND id = ?  ", [new Date(), id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log(res);
            result(null, res.affectedRows);
        }
    });
};
module.exports = Reserva;