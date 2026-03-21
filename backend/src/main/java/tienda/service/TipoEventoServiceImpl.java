package tienda.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tienda.entidades.TipoEvento;
import tienda.repository.TipoEventoRepository;

@Service
public class TipoEventoServiceImpl implements TipoEventoService {
	
	@Autowired
	private TipoEventoRepository tipoEventoRepository;

	@Override
	public List<TipoEvento> findAll() {
		
		return tipoEventoRepository.findAll();
	}

	@Override
	public TipoEvento findById(Long id) {
		
		return tipoEventoRepository.findById(id).orElse(null);
	}

	@Override
	public TipoEvento insertOne(TipoEvento evento) {
		
		return tipoEventoRepository.save(evento);
	}

	@Override
	public TipoEvento updateOne(TipoEvento evento) {
		if (tipoEventoRepository.existsById(evento.getId()))
			return tipoEventoRepository.save(evento);
		else
			return null;
	}

	@Override
	public int deleteOne(Long id) {
		if (tipoEventoRepository.existsById(id)) {
			tipoEventoRepository.deleteById(id);
			return 1;
		}
		return 0;
	}

}
