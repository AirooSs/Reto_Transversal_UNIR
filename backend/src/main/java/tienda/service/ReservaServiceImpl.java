package tienda.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tienda.entidades.Reserva;
import tienda.repository.ReservaRepository;

@Service
public class ReservaServiceImpl implements ReservaService {

	@Autowired
	private ReservaRepository reservaRepository;

	@Override
	public List<Reserva> findAll() {
		// TODO Auto-generated method stub
		return reservaRepository.findAll();
	}

	@Override
	public Reserva findById(Long id) {
		// TODO Auto-generated method stub
		return reservaRepository.findById(id).orElse(null);
	}

	@Override
	public Reserva insertOne(Reserva reserva) {
		// TODO Auto-generated method stub
		return reservaRepository.save(reserva);
	}

	@Override
	public Reserva updateOne(Reserva reserva) {
		// TODO Auto-generated method stub
		if (reservaRepository.existsById(reserva.getId()))
			return reservaRepository.save(reserva);
		else
			return null;
	}

	@Override
	public int deleteOne(Long id) {
		// TODO Auto-generated method stub
		if (reservaRepository.existsById(id)) {
			reservaRepository.deleteById(id);
			return 1;
		}
		return 0;
	}

}
