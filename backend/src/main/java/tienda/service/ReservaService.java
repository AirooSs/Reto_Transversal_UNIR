package tienda.service;

import tienda.entidades.Reserva;

import java.util.List;
import java.util.Map;

public interface ReservaService {

	List<Reserva> findAll();

	Reserva findById(Long id);

	Map<String, Object> crearReserva(Long usuarioId, Long eventoId, Integer cantidad);

	int cancelarReserva(Long reservaId, Long usuarioId);

	List<Reserva> findReservasActivasByUsuario(Long usuarioId);
}
