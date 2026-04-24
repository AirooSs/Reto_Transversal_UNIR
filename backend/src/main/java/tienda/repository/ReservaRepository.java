package tienda.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tienda.entidades.Evento;
import tienda.entidades.Reserva;
import tienda.entidades.Usuario;

import java.util.List;
import java.util.Optional;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {
    List<Reserva> findByUsuario(Usuario usuario);
    Optional<Reserva> findByUsuarioAndEvento(Usuario usuario, Evento evento);
}
