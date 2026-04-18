package tienda.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tienda.entidades.Evento;
import tienda.repository.EventoRepository;

@Service
public class EventoServiceImpl implements EventoService {

	@Autowired
	EventoRepository eventoRepository;

	@Override
	public List<Evento> findAll() {
		return eventoRepository.findAll();
	}

	@Override
	public Evento findById(Long id) {
		return eventoRepository.findById(id).orElse(null);
	}

	@Override
	public Evento insertOne(Evento evento) {
		return eventoRepository.save(evento);
	}

	@Override
	public Evento updateOne(Evento evento) {
		if (eventoRepository.existsById(evento.getId()))
			return eventoRepository.save(evento);
		else
			return null;
	}

	@Override
	public int deleteOne(Long id) {
		if (eventoRepository.existsById(id)) {
			eventoRepository.deleteById(id);
			return 1;
		}
		return 0;
	}

	@Override
	public List<Evento> findDestacados() {
		return eventoRepository.findByDestacadoTrue();
	}
}
