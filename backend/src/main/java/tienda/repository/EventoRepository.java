package tienda.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tienda.entidades.Evento;
import tienda.enums.EstadoEvento;

import java.util.List;

public interface EventoRepository extends JpaRepository<Evento, Long> {

	List<Evento> findByEstado(EstadoEvento estado);

	List<Evento> findByDestacadoTrue();
}
