package tienda.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tienda.entidades.Evento;

import java.util.List;

public interface EventoRepository extends JpaRepository<Evento, Long> {

	List<Evento> findByDestacadoTrue();
}
