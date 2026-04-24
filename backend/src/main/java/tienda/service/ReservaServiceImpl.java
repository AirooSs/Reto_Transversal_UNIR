package tienda.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tienda.entidades.Evento;
import tienda.entidades.Reserva;
import tienda.entidades.Usuario;
import tienda.repository.ReservaRepository;

@Service
public class ReservaServiceImpl implements ReservaService {

    @Autowired
    private ReservaRepository reservaRepository;

    @Override
    public List<Reserva> findAll() {
        return reservaRepository.findAll();
    }

    @Override
    public Reserva findById(Long id) {
        return reservaRepository.findById(id).orElse(null);
    }

    @Override
    public Reserva insertOne(Reserva reserva) {
        return reservaRepository.save(reserva);
    }

    @Override
    public Reserva updateOne(Reserva reserva) {
        if (reservaRepository.existsById(reserva.getId()))
            return reservaRepository.save(reserva);
        else
            return null;
    }

    @Override
    public int deleteOne(Long id) {
        if (reservaRepository.existsById(id)) {
            reservaRepository.deleteById(id);
            return 1;
        }
        return 0;
    }

    @Override
    public List<Reserva> findByUsuario(Usuario usuario) {
        return reservaRepository.findByUsuario(usuario);
    }

    @Override
    public Optional<Reserva> findByUsuarioAndEvento(Usuario usuario, Evento evento) {
        return reservaRepository.findByUsuarioAndEvento(usuario, evento);
    }
}
