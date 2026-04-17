package tienda.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tienda.entidades.Reserva;

import java.util.List;
import java.util.Optional;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {

	List<Reserva> findByUsuarioId(Long usuarioId);

	Optional<Reserva> findByUsuarioIdAndEventoId(Long usuarioId, Long eventoId);

	@Query("SELECT COALESCE(SUM(r.cantidad), 0) FROM Reserva r WHERE r.evento.id = :eventoId")
	Integer sumCantidadByEvento(@Param("eventoId") Long eventoId);

	@Query("SELECT r FROM Reserva r WHERE r.usuario.id = :usuarioId AND r.evento.fecha > CURRENT_TIMESTAMP")
	List<Reserva> findReservasActivasByUsuario(@Param("usuarioId") Long usuarioId);
}
