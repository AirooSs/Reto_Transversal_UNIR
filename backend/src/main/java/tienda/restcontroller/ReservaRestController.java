package tienda.restcontroller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tienda.entidades.Evento;
import tienda.entidades.Reserva;
import tienda.entidades.Usuario;
import tienda.repository.EventoRepository;
import tienda.repository.ReservaRepository;
import tienda.repository.UsuarioRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/reserva")
@CrossOrigin(origins = "http://localhost:4200")
public class ReservaRestController {

    private final ReservaRepository reservaRepository;
    private final EventoRepository eventoRepository;
    private final UsuarioRepository usuarioRepository;

    public ReservaRestController(ReservaRepository reservaRepository,
                                  EventoRepository eventoRepository,
                                  UsuarioRepository usuarioRepository) {
        this.reservaRepository = reservaRepository;
        this.eventoRepository = eventoRepository;
        this.usuarioRepository = usuarioRepository;
    }

    // Mis reservas - por email de usuario
    @GetMapping("/mis-reservas/{email}")
    ResponseEntity<?> misReservas(@PathVariable String email) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        List<Reserva> reservas = reservaRepository.findByUsuario(usuario);
        return ResponseEntity.ok(reservas);
    }

    // Crear reserva con validaciones
    @PostMapping("/")
    ResponseEntity<?> crearReserva(@RequestBody Map<String, Object> body) {

        String email = (String) body.get("email");
        Long eventoId = Long.valueOf(body.get("eventoId").toString());
        Integer cantidad = Integer.valueOf(body.get("cantidad").toString());

        // Validar cantidad máxima por reserva
        if (cantidad < 1 || cantidad > 10) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "La cantidad debe estar entre 1 y 10 entradas"));
        }

        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Evento evento = eventoRepository.findById(eventoId)
                .orElseThrow(() -> new RuntimeException("Evento no encontrado"));

        // Verificar si ya tiene reserva en este evento
        Optional<Reserva> reservaExistente = reservaRepository
                .findByUsuarioAndEvento(usuario, evento);

        if (reservaExistente.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("error", "Ya tienes una reserva para este evento"));
        }

        // Verificar aforo disponible
        if (evento.getPlazasDisponibles() < cantidad) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("error", "No hay suficientes plazas disponibles. Quedan: "
                            + evento.getPlazasDisponibles()));
        }

        // Crear reserva
        Reserva reserva = new Reserva();
        reserva.setCantidad(cantidad);
        reserva.setFechaReserva(LocalDateTime.now());
        reserva.setUsuario(usuario);
        reserva.setEvento(evento);
        reservaRepository.save(reserva);

        // Actualizar plazas disponibles
        evento.setPlazasDisponibles(evento.getPlazasDisponibles() - cantidad);
        eventoRepository.save(evento);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("mensaje", "Reserva realizada correctamente"));
    }

    // Cancelar reserva
    @DeleteMapping("/{id}")
    ResponseEntity<?> cancelarReserva(@PathVariable Long id) {
        Reserva reserva = reservaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reserva no encontrada"));

        // Devolver plazas al evento
        Evento evento = reserva.getEvento();
        evento.setPlazasDisponibles(evento.getPlazasDisponibles() + reserva.getCantidad());
        eventoRepository.save(evento);

        reservaRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
