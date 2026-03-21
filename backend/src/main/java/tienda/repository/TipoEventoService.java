package tienda.service;

import java.util.List;

import tienda.entidades.TipoEvento;

public interface TipoEventoService {
	// CRUD BASICO

	List<TipoEvento> findAll();

	TipoEvento findById(Long id);

	TipoEvento insertOne(TipoEvento evento);

	TipoEvento updateOne(TipoEvento evento);

	int deleteOne(Long id);

}
