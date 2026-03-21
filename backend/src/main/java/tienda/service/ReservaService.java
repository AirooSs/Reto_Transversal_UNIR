package tienda.service;

import java.util.List;

import tienda.entidades.Reserva;

public interface ReservaService {

	// CRUD BASICO

	List<Reserva> findAll();

	Reserva findById(Long id);

	Reserva insertOne(Reserva reserva);

	Reserva updateOne(Reserva reserva);

	int deleteOne(Long id);
}
