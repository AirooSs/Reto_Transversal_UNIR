package tienda.service;

import java.util.List;
import java.util.Optional;
import tienda.entidades.Evento;
import tienda.entidades.Reserva;
import tienda.entidades.Usuario;

public interface ReservaService {
    List<Reserva> findAll();
    Reserva findById(Long id);
    Reserva insertOne(Reserva reserva);
    Reserva updateOne(Reserva reserva);
    int deleteOne(Long id);
    List<Reserva> findByUsuario(Usuario usuario);
    Optional<Reserva> findByUsuarioAndEvento(Usuario usuario, Evento evento);
}
