package tienda.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tienda.entidades.Evento;
import tienda.entidades.Reserva;
import tienda.entidades.Usuario;
import tienda.repository.EventoRepository;
import tienda.repository.ReservaRepository;
import tienda.repository.UsuarioRepository;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ReservaServiceImpl implements ReservaService {

	private static final int MAX_ENTRADAS = 10;

	@Autowired
	private ReservaRepository reservaRepository;

	@Autowired
	private EventoRepository eventoRepository;

	@Autowired
	private UsuarioRepository usuarioRepository;

	@Override
	public List<Reserva> findAll() {
		return reservaRepository.findAll();
	}

	@Override
	public Reserva findById(Long id) {
		return reservaRepository.findById(id).orElse(null);
	}

	@Override
	public Map<String, Object> crearReserva(Long usuarioId, Long eventoId, Integer cantidad) {
		Map<String, Object> resultado = new HashMap<>();

		if (cantidad == null || cantidad < 1 || cantidad > MAX_ENTRADAS) {
			resultado.put("ok", false);
			resultado.put("mensaje", "La cantidad debe estar entre 1 y " + MAX_ENTRADAS + ".");
			return resultado;
		}

		Evento evento = eventoRepository.findById(eventoId).orElse(null);
		if (evento == null) {
			resultado.put("ok", false);
			resultado.put("mensaje", "El evento no existe.");
			return resultado;
		}

		Usuario usuario = usuarioRepository.findById(usuarioId).orElse(null);
		if (usuario == null) {
			resultado.put("ok", false);
			resultado.put("mensaje", "Usuario no encontrado.");
			return resultado;
		}

		Optional<Reserva> reservaExistente = reservaRepository.findByUsuarioIdAndEventoId(usuarioId, eventoId);
		if (reservaExistente.isPresent() && reservaExistente.get().getCantidad() >= MAX_ENTRADAS) {
			resultado.put("ok", false);
			resultado.put("mensaje", "Ya tienes el maximo de " + MAX_ENTRADAS + " entradas para este evento.");
			return resultado;
		}

		Integer plazasOcupadas = reservaRepository.sumCantidadByEvento(eventoId);
		if (plazasOcupadas == null) plazasOcupadas = 0;
		int plazasRestantes = evento.getAforoMaximo() - plazasOcupadas;

		if (cantidad > plazasRestantes) {
			resultado.put("ok", false);
			resultado.put("mensaje", "No hay suficientes plazas. Quedan " + plazasRestantes + ".");
			return resultado;
		}

		Reserva nuevaReserva = new Reserva();
		nuevaReserva.setUsuario(usuario);
		nuevaReserva.setEvento(evento);
		nuevaReserva.setCantidad(cantidad);
		nuevaReserva.setFechaReserva(LocalDateTime.now());
		reservaRepository.save(nuevaReserva);

		evento.setPlazasDisponibles(plazasRestantes - cantidad);
		eventoRepository.save(evento);

		resultado.put("ok", true);
		resultado.put("mensaje", "Reserva realizada correctamente.");
		resultado.put("reserva", nuevaReserva);
		return resultado;
	}

	@Override
	public int cancelarReserva(Long reservaId, Long usuarioId) {
		Reserva reserva = reservaRepository.findById(reservaId).orElse(null);
		if (reserva == null) return 0;
		if (!reserva.getUsuario().getId().equals(usuarioId)) return -1;

		Evento evento = reserva.getEvento();
		if (evento != null && evento.getPlazasDisponibles() != null) {
			evento.setPlazasDisponibles(evento.getPlazasDisponibles() + reserva.getCantidad());
			eventoRepository.save(evento);
		}

		reservaRepository.deleteById(reservaId);
		return 1;
	}

	@Override
	public List<Reserva> findReservasActivasByUsuario(Long usuarioId) {
		return reservaRepository.findReservasActivasByUsuario(usuarioId);
	}
}
