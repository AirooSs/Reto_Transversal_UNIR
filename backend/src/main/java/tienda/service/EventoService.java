package tienda.service;

import tienda.entidades.Evento;
import tienda.enums.EstadoEvento;

import java.util.List;

public interface EventoService {

	List<Evento> findAll();

	Evento findById(Long id);

	Evento insertOne(Evento evento);

	Evento updateOne(Evento evento);

	int deleteOne(Long id);

	List<Evento> findByEstado(EstadoEvento estado);

	List<Evento> findDestacados();
}
