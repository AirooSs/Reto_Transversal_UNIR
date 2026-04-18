package tienda.service;

import java.util.List;
import tienda.entidades.Evento;

public interface EventoService {

	List<Evento> findAll();

	Evento findById(Long id);

	Evento insertOne(Evento evento);

	Evento updateOne(Evento evento);

	int deleteOne(Long id);

	List<Evento> findDestacados();
}
